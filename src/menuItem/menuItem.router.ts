// create router for menuItem using /src/menuCategory/menuCategory.router.ts as reference

// Path: src/menuItem/menucradItem.router.ts
import { menuItemService } from "./menuItem.service";

import { createRouter, Request, Response } from "../utils/router";
import { isForeignKeyConstraintError, isNotFoundError } from "../utils/db";

const router = createRouter();

router.get("/menuItems", async (req: Request, res: Response) => {
  try {
    console.log("Fetching menuItems");
    const menuItems = await menuItemService.getAllMenuItems();
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menuItems: ", error);
    res.status(500).send("Error fetching menuItems");
  }
});

// create a new endpoint to retrieve all menuItems filtered by a given menucradCategory id
// use the getMenucardItemsByCategoryId method from the menuItemService
router.get(
  "/menuItems/menuCategory/:menuCategoryId",
  async (req: Request, res: Response) => {
    const { menuCategoryId } = req.params;

    try {
      console.log(`Fetching menuItems for menuCategoryId: ${menuCategoryId}`);
      const menuItems = await menuItemService.getMenuItemsByCategoryId(
        parseInt(menuCategoryId, 10)
      );
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menuItems: ", error);
      res.status(500).send("Error fetching menuItems");
    }
  }
);

router.post("/menuItems", async (req: Request, res: Response) => {
  const { menuCategoryId, name, price, type } = req.body;

  if (!(menuCategoryId && name && price && type)) {
    res.status(400).send("One of the mandatory fields is missing");
    return;
  }

  enum orderItemType {
    food = "FOOD",
    drink = "DRINK",
    other = "OTHER",
  }

  if (!Object.values(orderItemType).includes(type)) {
    res.status(400).send("Invalid type value");
    return;
  }

  try {
    const menuItem = await menuItemService.createMenuItem(req.body);
    res.json(menuItem);
  } catch (error) {
    if (isForeignKeyConstraintError(error)) {
      res
        .status(400)
        .send("Menucard category with the given ID does not exist.");
      return;
    }

    console.error("Error creating menuItem: ", error);
    res.status(500).send("Error creating menuItem");
  }
});

router.put("/menuItems/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const menuItem = req.body;

  try {
    const updatedMenucardItem = await menuItemService.updateMenuItem(
      parseInt(id, 10),
      menuItem
    );
    res.json(updatedMenucardItem);
  } catch (error) {
    if (isNotFoundError(error)) {
      res.status(404).send("Menu item not found");
      return;
    }
    console.error("Error updating menuItem: ", error);
    res.status(500).send("Error updating menuItem");
  }
});

router.delete("/menuItems/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await menuItemService.deleteMenuItem(parseInt(id, 10));
    res.status(200).send("Menu item deleted");
  } catch (error) {
    if (isNotFoundError(error)) {
      res.status(404).send("Menu item not found");
      return;
    }
    console.error("Error deleting menuItem: ", error);
    res.status(500).send("Error deleting menu item");
  }
});

export default router;
