// create service for order using /src/table/table.service.ts as reference
// use the MenuCardCategory model from /prisma/schema.prisma

import { Order } from "@prisma/client";
import { db } from "../utils/db";

class OrderService {
  async getAllMenuCategories() {
    return await db.order.findMany({});
  }

  async getOrderWithOrderItems(id: number) {
    return await db.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderItems: true,
      },
    });
  }

  async getOrderById(id: number) {
    return await db.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderItems: true,
      },
    });
  }

  async createOrder(order: Order) {
    console.log("creating order with orderItems: ", order);
    return await db.order.create({
      data: order,
    });
  }
  async updateOrder(id: number, order: Order) {
    return await db.order.update({
      where: { id },
      data: order,
    });
  }
}

export const orderService = new OrderService();
