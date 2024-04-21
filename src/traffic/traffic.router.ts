import { createRouter, Request, Response } from '../utils/router';
import { db } from '../utils/db';

const router = createRouter();

router.get("/traffic", async (req: Request, res: Response) => {
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
				MenuItem: true
			}
		});
		const traffic = {
			totalRevenue: 0,
			countOfOrderItem: []
		} as {
			totalRevenue: number,
			countOfOrderItem: {
				menuItemId: number,
				menuItemName: string,
				count: number
			}[]
		}
		allOrderItems.forEach(orderItem => {
			traffic.totalRevenue += Number(orderItem.MenuItem.price)
			const menuItem = traffic.countOfOrderItem.find(item => item.menuItemId === orderItem.menuItemId);
			if (menuItem) {
				menuItem.count += orderItem.quantity;
			} else {
				traffic.countOfOrderItem.push({
					menuItemId: orderItem.menuItemId,
					menuItemName: orderItem.MenuItem.name,
					count: orderItem.quantity
				});
			}
		});
		res.json(traffic);
	} catch (error) {
		console.error("Error fetching traffic: ", error);
		res.status(500).send("Error fetching traffic");
	}
})

export default router;
