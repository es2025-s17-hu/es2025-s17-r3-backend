// Path: prisma/seed/seedOrderItems.ts
import { db } from "../../src/utils/db";

export const seedOrderItems = async () => {
  type OrderItemJson = {
    orderId: number;
    quantity: number;
    menuCardItemId: number;
    createdAt: Date;
    updatedAt: Date;
    price: number;
  };
  const orderItemsFromJson: OrderItemJson[] = require("./seedData/orderitems.json");

  const orderItems = orderItemsFromJson.map((orderItem, index) => ({
    orderId: Number(orderItem.orderId),
    quantity: Number(orderItem.quantity),
    menuItemId: Number(orderItem.menuCardItemId),
    createdAt: new Date(orderItem.createdAt).toISOString(),
    updatedAt: new Date(orderItem.createdAt).toISOString(),
  }));

  return await db.orderItem.createMany({
    data: orderItems,
  });
};
