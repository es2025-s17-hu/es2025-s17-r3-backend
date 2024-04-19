// table.router.ts
import { tableService } from './table.service';
import { createRouter, Request, Response } from '../utils/router';
import { isNotFoundError } from '../utils/db';

const router = createRouter();

router.get('/tables', async (req: Request, res: Response) => {
    try {  
        console.log("Fetching tables");
        const tables = await tableService.getAllTables();
        res.json(tables);
    } catch (error) {
        console.error("Error fetching tables: ", error);
        res.status(500).send("Error fetching tables");
    }
});

router.post('/tables', async (req: Request, res: Response) => {
    try {
        const table = await tableService.createTable(req.body);
        res.json(table);
    } catch (error) {
        console.error("Error creating table: ", error);
        res.status(500).send("Error creating table");
    }
})

router.put('/tables/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const table = req.body;

    try {
        const updatedTable = await tableService.updateTable(parseInt(id, 10), table);
        res.json(updatedTable);
    } catch (error) {
        if (isNotFoundError(error)) {
            res.status(404).send("Table not found");
            return;
        }
        console.error("Error updating table: ", error);
        res.status(500).send("Error updating table");
    }
});

// Add more routes as needed for CRUD operations

export default router;
