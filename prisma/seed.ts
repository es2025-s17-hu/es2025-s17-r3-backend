import { MenucardCategory, MenucardItem } from '@prisma/client';
import { db } from '../src/utils/db';

type Table = {
    name: string;
    code: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

// type MenucardItem = {
//     id: number;
//     name: string;
//     type: "FOOD" | "DRINK";
//     menucardCategoryId: number;
//     price: number;
// };

const seedTables = async () => {
    const data: Table[] = require('./seedData/tables.json');
    const tables = data.map(row => (
        {
            name: row.code,
            x: Number(row.x),
            y: Number(row.y),
            width: Number(row.width),
            height: Number(row.height),
        }
    ));
    return await db.table.createMany({
        data: tables,
    });

}

const seedMenucardCategories = async () => {
    const menucardCategoriesFromJson: MenucardCategory[] = require('./seedData/menucardCategories.json');
    const menucardCategories = menucardCategoriesFromJson.map((row, index) => (
        {
            id: Number(row.id),
            name: row.name,
            priority: index === 1 ? 99 : Number(row.id),
        }
    ));
    return await db.menucardCategory.createMany({
        data: menucardCategories,

    });
}

const seedMenucardItems = async () => {
    const fs = require('fs');
    const path = require('path');
    const menucarditemsEn
        = fs.readFileSync(path.join(__dirname, './seedData/menucarditems-en.txt')).toString().split('\n');
    // read seedData/menucarditems.json and insert data into the 'menucardItem' table
    const menucardItemsFromJson = require('./seedData/menucardItems.json');
    const menucardItems: MenucardItem[] = menucardItemsFromJson.map((row: any, index: number) => {
        const { id, name, menuCardCategoryId, price, isFood } = row
           return {
                id: Number(id),
                name: menucarditemsEn[index],
                type: Number(isFood) === 1 ? "FOOD" : Number(menuCardCategoryId)===21 ? "OTHER" : "DRINK",
                menucardCategoryId: Number(menuCardCategoryId),
                price: Number(price),
            };
        });
    

    const menucardItemsHu = menucardItems.map(item => item.name).join('\n');
    fs.writeFileSync(path.join(__dirname, './seedData/menucarditems-hu.txt'), menucardItemsHu);
    await db.menucardItem.createMany({
        data: menucardItems,
    });
}

const seedRestaurant = async () => {
    const fs = require('fs');
    const path = require('path');
    const sql
        = fs.readFileSync(path.join(__dirname, './seedData/insertRestaurant.sql')).toString()
    const sql2 = `INSERT INTO Restaurant ( name, postCode, city, address, countryCode, vatId, createdAt, updatedAt, deletedAt ) VALUES ( 'Vegazzi', '1111', 'Budapest', 'Váci út 12.', 'HU', '12345666-2-23', NOW(), NOW(), NULL );`
    return await db.$queryRawUnsafe(sql)
}

const seedAll = async () => {
    await seedTables();
    await seedMenucardCategories();
    await seedMenucardItems();
    await seedRestaurant();
};

const seed = async () => {
    try {
        await seedAll();
        console.log('Restaurant, Table MenucardCategory, MenucardItem seed data inserted');
    } catch (error) {
        console.error('Error inserting seed data: ', error);
    }
}

seed();

