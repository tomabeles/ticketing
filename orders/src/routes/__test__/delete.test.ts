import request from "supertest";
import mongoose from "mongoose";

import { app } from "../../app";

import { natsWrapper } from "../../nats-wrapper";

import { OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  return ticket;
};

it("It marks an order as cancelled", async () => {
  const ticket1 = await buildTicket();

  const user1 = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  const response = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user1)
    .send()
    .expect(200);

  expect(response.body.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
  const ticket1 = await buildTicket();

  const user1 = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  const response = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user1)
    .send()
    .expect(200);

  expect(response.body.status).toEqual(OrderStatus.Cancelled);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
