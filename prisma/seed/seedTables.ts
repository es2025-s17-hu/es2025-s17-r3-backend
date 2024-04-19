import { db } from "../../src/utils/db";

export const seedTables = async () => {
  type TableJson = {
    code: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };
  const tablesFromJson = require("./data/tables.json");
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
