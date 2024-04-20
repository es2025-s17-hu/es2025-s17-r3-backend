import { menuCategoryService } from "./menuCategory.service";
import { createRouter, Request, Response } from "../utils/router";
import { isNotFoundError } from "../utils/db";

const router = createRouter();

const getAllMenuCategories = async (req: Request, res: Response) => {
  try {
    console.log("Fetching menuCategories");
    const menuCategories = await menuCategoryService.getAllMenuCategories();
    res.json(menuCategories);
  } catch (error) {
    console.error("Error fetching menuCategories: ", error);
    res.status(500).send("Error fetching menuCategories");
  }
};

const getMenuCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log("Fetching menuCategories with menutems");
    const menuCategories = await menuCategoryService.getMenuCategoryById(
      parseInt(id, 10)
    );
    res.json(menuCategories);
  } catch (error) {
    console.error("Error fetching menuCategories: ", error);
    res.status(500).send("Error fetching menuCategories");
  }
};

const createMenuCategory = async (req: Request, res: Response) => {
  try {
    const menuCategory = await menuCategoryService.createMenuCategory(req.body);
    res.status(201).json(menuCategory);
  } catch (error) {
    console.error("Error creating menuCategory: ", error);
    res.status(500).send("Error creating menuCategory");
  }
};

const updateMenuCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const menuCategory = req.body;

  try {
    const updatedMenuCategory = await menuCategoryService.updateMenuCategory(
      parseInt(id, 10),
      menuCategory
    );
    res.json(updatedMenuCategory);
  } catch (error) {
    if (isNotFoundError(error)) {
      res.status(404).send("MenuCategory not found");
      return;
    }
    console.error("Error updating menuCategory: ", error);
    res.status(500).send("Error updating menuCategory");
  }
};

const deleteMenuCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    console.log("Deleting menuCategory with id: ", id); // log the id to be deleted
    await menuCategoryService.deleteMenuCategory(parseInt(id, 10));
    res.status(200).send("Menu category deleted");
  } catch (error) {
    if (isNotFoundError(error)) {
      res.status(404).send("Menu category not found");
      return;
    }
    console.error("Error deleting menuCategory: ", error);
    res.status(500).send("Error deleting menuCategory");
  }
};

router.get("/menuCategories", getAllMenuCategories);
router.get("/menuCategories/:id", getMenuCategoryById);
router.post("/menuCategories", createMenuCategory);
router.put("/menuCategories/:id", updateMenuCategory);
router.delete("/menuCategories/:id", deleteMenuCategory);

export default router;
