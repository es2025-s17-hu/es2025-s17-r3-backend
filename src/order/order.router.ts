// Path: src/order/order.router.ts
import { orderService } from "./order.service";

import { createRouter, Request, Response } from "../utils/router";
import { isNotFoundError } from "../utils/db";

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

router.get("/orders/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log("Fetching orders with menutems");
    const orders = await orderService.getOrderById(parseInt(id, 10));
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders: ", error);
    res.status(500).send("Error fetching orders");
  }
});

router.post("/orders", async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.json(order);
  } catch (error) {
    console.error("Error creating order: ", error);
    res.status(500).send("Error creating order");
  }
});

router.put("/orders/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = req.body;

  try {
    const updatedOrder = await orderService.updateOrder(
      parseInt(id, 10),
      order
    );
    res.json(updatedOrder);
  } catch (error) {
    if (isNotFoundError(error)) {
      res.status(404).send("Order not found");
      return;
    }
    console.error("Error updating order: ", error);
    res.status(500).send("Error updating order");
  }
});

export default router;
