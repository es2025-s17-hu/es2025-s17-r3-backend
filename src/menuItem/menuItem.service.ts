// create service for menuItem using /src/table/menuCategory.service.ts as reference
// Service serve full CRUD endpoints for the MenuItem model
// use the MenuCategory model from /prisma/schema.prisma
// instead import { MenuItem } from '@prisma/client'; use import { db } from '../utils/db';

import { db } from '../utils/db';
import { MenuItem } from '@prisma/client';

class MenuItemService {
    async getAllMenuItems() {
        return await db.menuItem.findMany();
    }

    // createMenuItem method to retrieve all menuItems filtered by a given menucradCategory id and dered by priority asc
    async getMenuItemsByCategoryId(menuCategoryId: number) {
        return await db.menuItem.findMany({
            where: {
                menuCategoryId,
            },
        });
    }

    async createMenuItem(menuItem: MenuItem) {
        return await db.menuItem.create({
            data: menuItem,
        });
    }

    async updateMenuItem(id: number, menuItem: MenuItem) {
        return await db.menuItem.update({
            where: { id },
            data: menuItem,
        });
    }

    async deleteMenuItem(id: number) {
        return await db.menuItem.delete({
            where: { id },
        });
    }
}

export const menuItemService = new MenuItemService();
