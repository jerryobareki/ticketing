import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@weonlifetickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
