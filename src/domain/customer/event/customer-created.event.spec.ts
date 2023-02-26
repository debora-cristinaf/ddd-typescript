import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1 from "./handler/sendConsoleLog1.handler";
import SendConsoleLog2 from "./handler/sendConsoleLog2.handler";

describe("Customer created event tests", () => {
  it("should notify the event handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1();
    const eventHandler2 = new SendConsoleLog2();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);

    const eventPayload = {
      customer: {
        id: "1",
        name: "Teste",
        active: false,
      },
    };

    const customerCreatedEvent = new CustomerCreatedEvent(eventPayload);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});
