// Path: prisma/seed/seedOrders.ts
import { db } from "../../src/utils/db";

export const seedOrders = async () => {
  type OrderJson = { tableId: string; updatedAt: Date; isOpen: string };
  const ordersFromJson: OrderJson[] = require("./data/orders.json");
  const orders = ordersFromJson.map((order, index) => ({
    tableId: Number(order.tableId),
    userId: 2,
    closedAt: order.isOpen === "1" ? null : new Date(),
  }));
  return await db.order.createMany({
    data: orders,
  });
};
