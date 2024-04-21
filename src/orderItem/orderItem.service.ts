import {  OrderItem } from "@prisma/client";
import { db } from "../utils/db";

class OrderItemService {

  async createOrderItem(orderItem: OrderItem) {
    return await db.orderItem.create({
      data: orderItem,
    });
  }
}

export const orderItemService = new OrderItemService();
