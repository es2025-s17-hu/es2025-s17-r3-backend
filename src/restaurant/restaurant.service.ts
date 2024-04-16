import { Restaurant } from "@prisma/client";
import { db } from "../utils/db";

class RestaurantService {
    async getRestaurantData() {
        return await db.restaurant.findFirst({
            orderBy: {
                updatedAt: 'desc',
            },
        });
    }

    async updateRestaurantData(restaurant: Restaurant) {
        const prevRestaurant = await this.getRestaurantData();
        const newRestaurant = { ...prevRestaurant, ...restaurant };
        return await db.restaurant.create({
            data: {
                name: newRestaurant.name,
                postCode: newRestaurant.postCode,
                city: newRestaurant.city,
                address: newRestaurant.address,
                countryCode: newRestaurant.countryCode,
                vatId: newRestaurant.vatId,
            }
        });
    }
}


export const restaurantService = new RestaurantService();
