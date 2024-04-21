import { db } from "../src/utils/db";
import fs from "fs";
import path from "path";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";

const seedTables = async () => {
  type TableJson = {
    code: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  const tablesFromJson = require("./seedData/tables.json");
  const tables = tablesFromJson.map((table: TableJson) => ({
    name: table.code,
    x: Number(table.x),
    y: Number(table.y),
    width: Number(table.width),
    height: Number(table.height),
  }));
  return await db.table.createMany({
    data: tables,
  });
};

const seedMenuCategories = async () => {
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

const seedMenuItems = async () => {
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

const seedRestaurant = async () => {
  const sql = fs
    .readFileSync(path.join(__dirname, "./data/insertRestaurant.sql"))
    .toString();
  const sql2 = `INSERT INTO Restaurant ( name, postCode, city, address, countryCode, vatId, createdAt, updatedAt, deletedAt ) VALUES ( 'Vegazzi', '1111', 'Budapest', 'Váci út 12.', 'HU', '12345666-2-23', NOW(), NOW(), NULL );`;
  return await db.$queryRawUnsafe(sql);
};
const seedUsers = async () => {
  type UserJson = {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    pin: string;
    role: string;
  };
  const usersFromJson = require("./seedData/users.json");
  const users: User[] = usersFromJson.map((user: UserJson) => {
    user.pin = user.pin?.length === 4 ? user.pin : randomUUID();
    console.log("User pin: ", user.pin);
    return {
      id: Number(user.id),
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      password: user.password,
      pin: user.pin,
      role: user.role,
    };
  });
  return await db.user.createMany({
    data: users,
  });
};

const seedAllData = async (): Promise<void> => {
  await Promise.all([
    seedTables(),
    seedMenuCategories(),
    seedMenuItems(),
    seedRestaurant(),
    seedUsers(),
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
