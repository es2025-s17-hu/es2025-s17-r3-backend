// create service for menuCategory using /src/table/table.service.ts as reference
// use the MenuCardCategory model from /prisma/schema.prisma

import { MenuCategory } from '@prisma/client';
import { db } from '../utils/db';

class MenuCategoryService {
    async getAllMenuCategories() {
        return await db.menuCategory.findMany({
            orderBy: {
                priority: 'asc',
            },
        });
    }

    async getMenuCategoryWithMenuItems(id: number) {
        return await db.menuCategory.findUnique({
            where: {
                id,
            },
            include: {
                MenuItems : true
            },
        });
    }

    // createMenuCategory method to retrieve a menuCategory by id and add all assigned menuItems ordered by priority asc
    async getMenuCategoryById(id: number) {
        return await db.menuCategory.findUnique({
            where: {
                id,
            },
            include: {
                MenuItems: true
            },
        });
    }

    async createMenuCategory(menuCategory: MenuCategory) {
        const existingMenuCategories = await this.getAllMenuCategories();
        const MenuCategoriesWithLowestPriority = existingMenuCategories.length > 0 ? existingMenuCategories[0] : {priority: 1};
        menuCategory.priority = MenuCategoriesWithLowestPriority.priority - 1;
        return await db.menuCategory.create({
            data: menuCategory,
        });
    }
    async updateMenuCategory(id: number, menuCategory: MenuCategory) {
        return await db.menuCategory.update({
            where: { id },
            data: menuCategory,
        });
    }
}

export const menuCategoryService = new MenuCategoryService();