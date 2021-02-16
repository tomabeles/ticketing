import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@thetommytickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
