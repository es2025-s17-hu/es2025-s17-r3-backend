import { createRouter, Request, Response } from "../utils/router";
import { db } from "../utils/db";

const router = createRouter();

router.get("/stats", async (req: Request, res: Response) => {
  /* Schema:
	{
		"totalRevenue": 0,
		"countOfOrderItem": [
		  {
			"menuItemId": 0,
			"menuItemName": "string",
			"count": 0
		  }
		]
	}
	*/
  try {
    const allOrderItems = await db.orderItem.findMany({
      include: {
        MenuItem: true,
      },
    });
    const stats = {
      totalRevenue: 0,
      countOfOrderItem: [],
    } as {
      totalRevenue: number;
      countOfOrderItem: {
        menuItemId: number;
        menuItemName: string;
        count: number;
      }[];
    };
    allOrderItems.forEach((orderItem) => {
      stats.totalRevenue +=
        Number(orderItem.MenuItem.price) * orderItem.quantity;
      const menuItem = stats.countOfOrderItem.find(
        (item) => item.menuItemId === orderItem.menuItemId
      );
      if (menuItem) {
        menuItem.count += orderItem.quantity;
      } else {
        stats.countOfOrderItem.push({
          menuItemId: orderItem.menuItemId,
          menuItemName: orderItem.MenuItem.name,
          count: orderItem.quantity,
        });
      }
    });
    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats: ", error);
    res.status(500).send("Error fetching stats");
  }
});

export default router;
