// create router for menuCategory using /src/table/table.router.ts as reference

// Path: src/menuCategory/menuCategory.router.ts
import { menuCategoryService } from './menuCategory.service';

import { createRouter, Request, Response } from '../utils/router';
import { isNotFoundError } from '../utils/db';

const router = createRouter();

router.get('/menuCategories', async (req: Request, res: Response) => {
    try {
        console.log("Fetching menuCategories");
        const menuCategories = await menuCategoryService.getAllMenuCategories();
        res.json(menuCategories);
    } catch (error) {
        console.error("Error fetching menuCategories: ", error);
        res.status(500).send("Error fetching menuCategories");
    }
});

router.get('/menuCategories/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        console.log("Fetching menuCategories with menutems");
        const menuCategories = await menuCategoryService.getMenuCategoryById(parseInt(id, 10));
        res.json(menuCategories);
    } catch (error) {
        console.error("Error fetching menuCategories: ", error);
        res.status(500).send("Error fetching menuCategories");
    }
});

router.post('/menuCategories', async (req: Request, res: Response) => {
    try {
        const menuCategory = await menuCategoryService.createMenuCategory(req.body);
        res.json(menuCategory);
    } catch (error) {
        console.error("Error creating menuCategory: ", error);
        res.status(500).send("Error creating menuCategory");
    }
})

router.put('/menuCategories/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const menuCategory = req.body;

    try {
        const updatedMenuCategory = await menuCategoryService.updateMenuCategory(parseInt(id, 10), menuCategory);
        res.json(updatedMenuCategory);
    } catch (error) {
        if (isNotFoundError(error)) {
            res.status(404).send("MenuCategory not found");
            return;
        }
        console.error("Error updating menuCategory: ", error);
        res.status(500).send("Error updating menuCategory");
    }
});

export default router;