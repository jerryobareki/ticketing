import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@weonlifetickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
