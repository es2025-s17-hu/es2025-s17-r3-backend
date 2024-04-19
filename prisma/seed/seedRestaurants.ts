import { db } from "../../src/utils/db";
import fs from "fs";
import path from "path";
export const seedRestaurant = async () => {
  const sql = fs
    .readFileSync(path.join(__dirname, "./data/insertRestaurant.sql"))
    .toString();
  const sql2 = `INSERT INTO Restaurant ( name, postCode, city, address, countryCode, vatId, createdAt, updatedAt, deletedAt ) VALUES ( 'Vegazzi', '1111', 'Budapest', 'Váci út 12.', 'HU', '12345666-2-23', NOW(), NOW(), NULL );`;
  return await db.$queryRawUnsafe(sql);
};
