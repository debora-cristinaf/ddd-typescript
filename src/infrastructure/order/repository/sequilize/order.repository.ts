import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: OrderItemModel,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const items = orderModel.items.map((order) => {
      let orderItem = new OrderItem(
        order.id,
        order.name,
        order.price,
        order.product_id,
        order.quantity
      );
      return orderItem;
    });

    const order = new Order(orderModel.id, orderModel.customer_id, items);

    return order;
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: OrderItemModel });

    const orders = orderModels.map((item) => {
      const items = item.items.map((order) => {
        let orderItem = new OrderItem(
          order.id,
          order.name,
          order.price,
          order.product_id,
          order.quantity
        );
        return orderItem;
      });

      let order = new Order(item.id, item.customer_id, items);

      return order;
    });

    return orders;
  }
  async create(entity: Order): Promise<void> {
    const order = {
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        };
      }),
    };

    await OrderModel.create(order, {
      include: [{ model: OrderItemModel }],
    });
  }
}
