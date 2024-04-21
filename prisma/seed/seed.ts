import { seedTables } from "./seedTables";
import { seedMenuCategories } from "./seedMenuCategories";
import { seedUsers } from "./seedUsers";
import { seedMenuItems } from "./seedMenuItems";
import { seedOrders } from "./seedOrders";
import { seedOrderItems } from "./seedOrderItems";

const seedAllData = async (): Promise<void> => {
  await seedTables();
  await seedMenuCategories();
  await seedMenuItems();
  await seedUsers();
  await seedOrders();
  await seedOrderItems();
};

const seed = async () => {
  try {
    await seedAllData();
    console.log(
      "Table,  MenuCategory, MenuItem, User  seed data inserted"
    );
  } catch (error) {
    console.error("Error inserting seed data: ", error);
  }
};

seed();
