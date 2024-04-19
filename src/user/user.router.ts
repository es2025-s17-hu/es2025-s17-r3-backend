// user.router.ts
import { userService } from './user.service';
import { createRouter, Request, Response } from '../utils/router';
import { isNotFoundError } from '../utils/db';

const router = createRouter();

router.get('/users', async (req: Request, res: Response) => {
    try {  
        console.log("Fetching users");
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).send("Error fetching users");
    }
});

router.post('/users', async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (error) {
        console.error("Error creating user: ", error);
        res.status(500).send("Error creating user");
    }
})

router.put('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.body;

    try {
        const updatedUser = await userService.updateUser(parseInt(id, 10), user);
        res.json(updatedUser);
    } catch (error) {
        if (isNotFoundError(error)) {
            res.status(404).send("User not found");
            return;
        }
        console.error("Error updating user: ", error);
        res.status(500).send("Error updating user");
    }
});

// Add more routes as needed for CRUD operations

export default router;
