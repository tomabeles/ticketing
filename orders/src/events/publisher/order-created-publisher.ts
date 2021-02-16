import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@thetommytickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
