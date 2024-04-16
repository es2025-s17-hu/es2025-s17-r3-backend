// table.service.ts
import { Table } from '@prisma/client';
import { db } from '../utils/db';

class TableService {
    async getAllTables() {
        return await db.table.findMany();
    }

    async createTable(table: Table) {
        return await db.table.create({
            data: table,
        });
    }
    async updateTable(id: number, table: Table) {
        return await db.table.update({
            where: { id },
            data: table,
        });
    }
}

export const tableService = new TableService();
