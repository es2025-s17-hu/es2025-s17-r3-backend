import {  OrderItem } from "@prisma/client";
import { db } from "../utils/db";

class OrderItemService {

  async createOrderItem(orderItem: OrderItem) {
    const order = await db.order.findUnique({
      where: { id: orderItem.orderId },
    });
    console.log(order)
    if (!order || order.closedAt) {
      throw new Error("Order not found or closed.");
    }
    return await db.orderItem.create({
      data: orderItem,
    });
  }
}

export const orderItemService = new OrderItemService();
