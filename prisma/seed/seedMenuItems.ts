import path from "path";
import fs from "fs";
import { db } from "../../src/utils/db";

export const seedMenuItems = async () => {
  type MenuItemJson = {
    id: number;
    name: string;
    menuCardCategoryId: number;
    price: number;
    isFood: number;
  };
  const menuitemsEn: string[] = fs
    .readFileSync(path.join(__dirname, "./data/menuitems-en.txt"))
    .toString()
    .split("\n");
  const menuItemsFromJson: MenuItemJson[] = require("./seedData/menuItems.json");
  const menuItems = menuItemsFromJson.map((menuItem, index) => {
    const { id, menuCardCategoryId, price, isFood } = menuItem;
    return {
      id: Number(id),
      name: menuitemsEn[index].replace(/[^a-zA-Z0-9 ]/g, ""),
      type:
        Number(isFood) === 1
          ? "FOOD"
          : Number(menuCardCategoryId) === 21
          ? "OTHER"
          : "DRINK",
      menuCategoryId: Number(menuCardCategoryId),
      price: Number(price),
    };
  });
  const menuItemsHu = menuItems.map((menuItem) => menuItem.name).join("\n");
  fs.writeFileSync(
    path.join(__dirname, "./data/menuitems-hu.txt"),
    menuItemsHu
  );

  await db.menuItem.createMany({
    data: menuItems,
  });
};
