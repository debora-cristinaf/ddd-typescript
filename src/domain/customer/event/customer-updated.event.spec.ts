import EventDispatcher from "../../@shared/event/event-dispatcher";
import { CustomerChangedAddressEvent } from "./customer-updated.event";
import SendConsoleLogAddressHandler from "./handler/sendConsoleLogAddressUpdated.handler";

describe("Customer address update event", () => {
  it("should notify the event handler when customer address is updated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLogAddressHandler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length
    ).toBe(1);

    const eventPayload = {
      customer: {
        id: "1",
        name: "Teste",
        oldAddress: {
          street: "Old Street",
          number: "1",
          city: "Old City",
          postalCode: "123456789",
        },
        newAddress: {
          street: "New Street",
          number: "1",
          city: "Old City",
          postalCode: "123456789",
        },
      },
    };

    const customerCreatedEvent = new CustomerChangedAddressEvent(eventPayload);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
  });
});
