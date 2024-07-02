import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@weonlifetickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
