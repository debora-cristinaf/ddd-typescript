import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";
import { CustomerChangedAddressEvent } from "../customer-updated.event";

export default class SendConsoleLogAddressHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerChangedAddressEvent): void {
    const { id, name, oldAddress, newAddress } = event.payload.customer;
    console.log(
      `Endereço do cliente: ${id}, ${name} , endereço: ${oldAddress.street}, ${oldAddress.city}, ${oldAddress.number}, ${oldAddress.postalCode}
       alterado para: ${newAddress.street}, ${newAddress.city}, ${newAddress.number}, ${newAddress.postalCode}`
    );
  }
}
