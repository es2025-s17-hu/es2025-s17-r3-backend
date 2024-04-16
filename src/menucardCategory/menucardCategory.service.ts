// create service for menucardCategory using /src/table/table.service.ts as reference
// use the MenuCardCategory model from /prisma/schema.prisma

import { MenucardCategory } from '@prisma/client';
import { db } from '../utils/db';

class MenucardCategoryService {
    async getAllMenucardCategories() {
        return await db.menucardCategory.findMany({
            orderBy: {
                priority: 'asc',
            },
        });
    }

    async getAllMenucardCategoryWithMenucardItems(id: number) {
        return await db.menucardCategory.findUnique({
            where: {
                id,
            },
            include: {
                MenucardItems: {
                    orderBy: {
                        priority: 'asc',
                    },
                },
            },
        });
    }

    // createMenucardCategory method to retrieve a menucardCategory by id and add all assigned menucardItems ordered by priority asc
    async getMenucardCategoryById(id: number) {
        return await db.menucardCategory.findUnique({
            where: {
                id,
            },
            include: {
                MenucardItems: {
                    orderBy: {
                        priority: 'asc',
                    },
                },
            },
        });
    }

    async createMenucardCategory(menucardCategory: MenucardCategory) {
        return await db.menucardCategory.create({
            data: menucardCategory,
        });
    }
    async updateMenucardCategory(id: number, menucardCategory: MenucardCategory) {
        return await db.menucardCategory.update({
            where: { id },
            data: menucardCategory,
        });
    }
}

export const menucardCategoryService = new MenucardCategoryService();