

import { createRouter, Request, Response, body, validationResult } from '../utils/router';
import { restaurantService } from './restaurant.service';

// GET /restaurant endpoint to fetch restaurant details
const router = createRouter();

router.get('/restaurant', async (req: Request, res: Response) => {
    try {
        const restaurant = await restaurantService.getRestaurantData();
        console.log("Restaurants: ", restaurant);
        res.json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant: ", error);
        res.status(500).send("Error fetching restaurants");
    }
});

// PUT /restaurant endpoint to update restaurant details
router.put('/restaurant', body('name').isString(), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const updatedRestaurant = await restaurantService.updateRestaurantData(req.body);
        res.json(updatedRestaurant);
    } catch (error) {
        console.error("Error updating restaurant: ", error);
        res.status(500).send("Error updating restaurant");
    }
});

export default router;