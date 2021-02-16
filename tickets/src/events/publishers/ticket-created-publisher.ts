import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@thetommytickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
