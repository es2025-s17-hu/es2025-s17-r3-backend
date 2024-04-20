// Path: prisma/seed/seedOrders.ts
import { create } from "domain";
import { db } from "../../src/utils/db";

export const seedOrders = async () => {
  type OrderJson = {
    id: Number;
    tableId: string;
    createdAt: Date;
    updatedAt: Date;
    isOpen: string;
  };
  const ordersFromJson: OrderJson[] = require("./data/orders.json");
  const orders = ordersFromJson.map((order, index) => ({
    id: Number(order.id),
    tableId: Number(order.tableId),
    userId: 2,
    createdAt: new Date(order.createdAt).toISOString(),
    closedAt:
      order.isOpen === "1" ? null : new Date(order.updatedAt).toISOString(),
  }));
  return await db.order.createMany({
    data: orders,
  });
};
