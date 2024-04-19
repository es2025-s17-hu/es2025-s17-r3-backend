import { seedTables } from "./seedTables";
import { seedMenuCategories } from "./seedMenuCategories";
import { seedRestaurant } from "./seedRestaurants";
import { seedUsers } from "./seedUsers";
import { seedMenuItems } from "./seedMenuItems";
import { seedOrders } from "./seedOrders";

const seedAllData = async (): Promise<void> => {
  await Promise.all([
    seedTables(),
    seedMenuCategories(),
    seedMenuItems(),
    seedRestaurant(),
    seedUsers(),
    seedOrders(),
  ]);
};

const seed = async () => {
  try {
    await seedAllData();
    console.log(
      "Restaurant, Table,  MenuCategory, MenuItem, User  seed data inserted"
    );
  } catch (error) {
    console.error("Error inserting seed data: ", error);
  }
};

seed();
