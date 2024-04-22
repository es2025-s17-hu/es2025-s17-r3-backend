// table.service.ts
import { Table } from '@prisma/client';
import { db } from '../utils/db';

class TableService {
    async getAllTables() {
        const tables = await db.table.findMany()
        return await Promise.all(tables.map(async (table) => {
            const lastOpenOrder = await db.order.findFirst({
                where: {
                    tableId: table.id,
                    closedAt: null,
                }
            });
            return {
                ...table,
                hasOpenOrder: !!lastOpenOrder,
            };
        }));
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
