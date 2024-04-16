// create service for menucardItem using /src/table/menucardCategory.service.ts as reference
// Service serve full CRUD endpoints for the MenucardItem model
// use the MenuCardCategory model from /prisma/schema.prisma
// instead import { MenucardItem } from '@prisma/client'; use import { db } from '../utils/db';

import { db } from '../utils/db';
import { MenucardItem } from '@prisma/client';

class MenucardItemService {
    async getAllMenucardItems() {
        return await db.menucardItem.findMany({
            orderBy: {
                priority: 'asc',
            },
        });
    }

    // createMenucardItem method to retrieve all menucardItems filtered by a given menucradCategory id and dered by priority asc
    async getMenucardItemsByCategoryId(menucardCategoryId: number) {
        return await db.menucardItem.findMany({
            where: {
                menucardCategoryId,
            },
            orderBy: {
                priority: 'asc',
            },
        });
    }

    async createMenucardItem(menucardItem: MenucardItem) {
        return await db.menucardItem.create({
            data: menucardItem,
        });
    }

    async updateMenucardItem(id: number, menucardItem: MenucardItem) {
        return await db.menucardItem.update({
            where: { id },
            data: menucardItem,
        });
    }

    async deleteMenucardItem(id: number) {
        return await db.menucardItem.delete({
            where: { id },
        });
    }
}

export const menucardItemService = new MenucardItemService();
