// create router for menucardItem using /src/menucardCategory/menucardCategory.router.ts as reference

// Path: src/menucardItem/menucradItem.router.ts
import { menucardItemService } from './menucardItem.service';

import { createRouter, Request, Response } from '../utils/router';
import { isNotFoundError } from '../utils/db';

const router = createRouter();

router.get('/menucardItems', async (req: Request, res: Response) => {
    try {
        console.log("Fetching menucardItems");
        const menucardItems = await menucardItemService.getAllMenucardItems();
        res.json(menucardItems);
    } catch (error) {
        console.error("Error fetching menucardItems: ", error);
        res.status(500).send("Error fetching menucardItems");
    }
});

// create a new endpoint to retrieve all menucardItems filtered by a given menucradCategory id
// use the getMenucardItemsByCategoryId method from the menucardItemService
router.get('/menucardItems/menucardCategory/:menucardCategoryId', async (req: Request, res: Response) => {
    const { menucardCategoryId } = req.params;

    try {
        console.log(`Fetching menucardItems for menucardCategoryId: ${menucardCategoryId}`);
        const menucardItems = await menucardItemService.getMenucardItemsByCategoryId(parseInt(menucardCategoryId, 10));
        res.json(menucardItems);
    } catch (error) {
        console.error("Error fetching menucardItems: ", error);
        res.status(500).send("Error fetching menucardItems");
    }
}
);

router.post('/menucardItems', async (req: Request, res: Response) => {
    try {
        const menucardItem = await menucardItemService.createMenucardItem(req.body);
        res.json(menucardItem);
    } catch (error) {
        console.error("Error creating menucardItem: ", error);
        res.status(500).send("Error creating menucardItem");
    }
})

router.put('/menucardItems/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const menucardItem = req.body;

    try {
        const updatedMenucardItem = await menucardItemService.updateMenucardItem(parseInt(id, 10), menucardItem);
        res.json(updatedMenucardItem);
    } catch (error) {
        if (isNotFoundError(error)) {
            res.status(404).send("MenucardItem not found");
            return;
        }
        console.error("Error updating menucardItem: ", error);
        res.status(500).send("Error updating menucardItem");
    }
});

router.delete('/menucardItems/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await menucardItemService.deleteMenucardItem(parseInt(id, 10));
        res.status(204).send();
    } catch (error) {
        if (isNotFoundError(error)) {
            res.status(404).send("MenucardItem not found");
            return;
        }
        console.error("Error deleting menucardItem: ", error);
        res.status(500).send("Error deleting menucardItem");
    }
});

export default router;


