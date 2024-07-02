import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@weonlifetickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
