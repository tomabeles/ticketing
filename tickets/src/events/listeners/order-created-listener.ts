import { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCreatedEvent } from "@thetommytickets/common";

import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

import { queueGroupName } from "./queue-group-name";

import { Ticket } from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      return new Error("Ticket not found");
    }

    ticket.orderId = data.id;
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    msg.ack();
  }
}
