// Path: src/order/order.router.ts
import { orderService } from "./order.service";

import { createRouter, Request, Response } from "../utils/router";
import { isNotFoundError } from "../utils/db";
import { Order } from "@prisma/client";

const router = createRouter();

router.get("/orders", async (req: Request, res: Response) => {
  try {
    console.log("Fetching orders");
    const orders = await orderService.getAllMenuCategories();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders: ", error);
    res.status(500).send("Error fetching orders");
  }
});

router.get("/orders/tables/:id", async (req: Request, res: Response) => {
  const { id: tableId } = req.params;
  try {
    console.log("Fetching orders with menutems");
    const order = await orderService.getOrderByTableId(parseInt(tableId, 10));
    if (!order) {
      res.status(404).send("Order not found");
      return;
    }
    res.json(order);
  } catch (error) {
    console.error("Error fetching orders: ", error);
    res.status(500).send("Error fetching orders");
  }
});

router.post("/orders", async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.json(order);
  } catch (error: any | Error) {
    if (error.message === "Table already has an open order") {
      res.status(400).send("Table already has an open order");
      return;
    } else if (error.message === "Table not found") {
      res.status(404).send("Table not found");
      return;
    }
    console.error("Error creating order: ", { error });
    res.status(500).send("Error creating order");
  }
});

router.put("/orders/tables/:id/close", async (req: Request, res: Response) => {
  const { id: tableId } = req.params;
  const orderToCLose = await orderService.getOrderByTableId(
    parseInt(tableId, 10)
  );

  if (!orderToCLose) {
    res.status(404).send("Order not found");
    return;
  }

  try {
    const closedOrder = await orderService.closeOrder({
      id: orderToCLose.id,
      tableId: orderToCLose.tableId,
      closedAt: new Date(),
    } as Order);
    res.send("Order closed successfully");
  } catch (error) {
    console.error("Error updating order: ", error);
    res.status(500).send("Error updating order");
  }
});

export default router;
