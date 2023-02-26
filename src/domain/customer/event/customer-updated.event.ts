import EventInterface from "../../@shared/event/event.interface";

interface Address {
  street: string;
  number: string;
  city: string;
  postalCode: string;
}

interface CustomerChangedAddressEventPayload {
  customer: {
    id: string;
    name: string;
    oldAddress: Address;
    newAddress: Address;
  };
}

export class CustomerChangedAddressEvent implements EventInterface {
  dateTimeOccurred: Date;
  payload: CustomerChangedAddressEventPayload;

  constructor(eventPayload: CustomerChangedAddressEventPayload) {
    this.dateTimeOccurred = new Date();
    this.payload = eventPayload;
  }
  dataTimeOccurred: Date;
  eventData: any;
}
