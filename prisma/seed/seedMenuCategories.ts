import { db } from "../../src/utils/db";

export const seedMenuCategories = async () => {
  type MenuCategoryJson = { id: number; name: string };
  const menuCategoriesFromJson: MenuCategoryJson[] = require("./seedData/menuCategories.json");
  const menuCategories = menuCategoriesFromJson.map((menuCategory, index) => ({
    id: Number(menuCategory.id),
    name: menuCategory.name,
    priority: index === 1 ? 99 : Number(menuCategory.id),
  }));
  return await db.menuCategory.createMany({
    data: menuCategories,
  });
};
