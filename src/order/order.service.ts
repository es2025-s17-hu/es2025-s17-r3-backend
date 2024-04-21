// create service for order using /src/table/table.service.ts as reference
// use the MenuCardCategory model from /prisma/schema.prisma

import { Order } from "@prisma/client";
import { db, isForeignKeyConstraintError } from "../utils/db";

class OrderService {
  async getAllMenuCategories() {
    return await db.order.findMany({
      orderBy: {
        closedAt: "desc",
      },
      include: {
        OrderItems: {
          include: {
            MenuItem: true,
          },
        },
      },
    });
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

  async getOrderByTableId(tableId: number) {
    return await db.order.findFirst({
      where: {
        tableId,
        closedAt: null,
      },
      include: {
        OrderItems: {
          include: {
            MenuItem: true,
          },
        }
      },
    });
  }

  async createOrder(order: Order) {
    console.log("creating order with orderItems: ", order);
    const openOrders = await db.order.findFirst({
      where: {
        closedAt: null,
        tableId: order.tableId,
      },
    });
    if (openOrders) {
      throw new Error("Table already has an open order");
    }
    try {
     return await db.order.create({
       data: order,
      });
    } catch (error) {
      if (isForeignKeyConstraintError(error)) {
        throw new Error("Table not found");
      }
      throw error;
    }
  }
  async closeOrder(order: Order) {
    return await db.order.update({
      where: {
        id: order.id,
      },
      data: order,
    });
  }
}

export const orderService = new OrderService();
