import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@thetommytickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
