import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from "@thetommytickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
