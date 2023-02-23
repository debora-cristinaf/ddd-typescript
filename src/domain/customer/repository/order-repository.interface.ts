import RepositoryInterface from "../../@shared/repository/repository-interface";
import Order from "../../checkout/entity/order";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Order> {}
