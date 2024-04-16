// create router for menucardCategory using /src/table/table.router.ts as reference

// Path: src/menucardCategory/menucardCategory.router.ts
import { menucardCategoryService } from './menucardCategory.service';

import { createRouter, Request, Response } from '../utils/router';
import { isNotFoundError } from '../utils/db';

const router = createRouter();

router.get('/menucardCategories', async (req: Request, res: Response) => {
    try {
        console.log("Fetching menucardCategories");
        const menucardCategories = await menucardCategoryService.getAllMenucardCategories();
        res.json(menucardCategories);
    } catch (error) {
        console.error("Error fetching menucardCategories: ", error);
        res.status(500).send("Error fetching menucardCategories");
    }
});

router.get('/menucardCategories/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        console.log("Fetching menucardCategories with menucardtems");
        const menucardCategories = await menucardCategoryService.getMenucardCategoryById(parseInt(id, 10));
        res.json(menucardCategories);
    } catch (error) {
        console.error("Error fetching menucardCategories: ", error);
        res.status(500).send("Error fetching menucardCategories");
    }
});

router.post('/menucardCategories', async (req: Request, res: Response) => {
    try {
        const menucardCategory = await menucardCategoryService.createMenucardCategory(req.body);
        res.json(menucardCategory);
    } catch (error) {
        console.error("Error creating menucardCategory: ", error);
        res.status(500).send("Error creating menucardCategory");
    }
})

router.put('/menucardCategories/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const menucardCategory = req.body;

    try {
        const updatedMenucardCategory = await menucardCategoryService.updateMenucardCategory(parseInt(id, 10), menucardCategory);
        res.json(updatedMenucardCategory);
    } catch (error) {
        if (isNotFoundError(error)) {
            res.status(404).send("MenucardCategory not found");
            return;
        }
        console.error("Error updating menucardCategory: ", error);
        res.status(500).send("Error updating menucardCategory");
    }
});

export default router;