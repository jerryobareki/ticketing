import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@weonlifetickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
