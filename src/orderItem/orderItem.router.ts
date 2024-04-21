// Path: src/order/order.router.ts
import { orderItemService } from "./orderItem.service";

import { createRouter, Request, Response } from "../utils/router";
import { isNotFoundError } from "../utils/db";
import { Order } from "@prisma/client";

const router = createRouter();

router.post("/orderItems", async (req: Request, res: Response) => {
  try {
    const orderItem = await orderItemService.createOrderItem(req.body);
    res.status(201).json(orderItem);
  } catch (error) {
    console.error("Error creating orderItem: ", error);
    res.status(400).send("The order item could not be created.");
  }
})

export default router;
