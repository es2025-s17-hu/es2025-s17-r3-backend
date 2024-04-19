// user.service.ts
import { User } from "@prisma/client";
import { db } from "../utils/db";
import { randomUUID } from "crypto";

class UserService {
  async getAllUsers() {
    return await db.user.findMany();
  }

  async createUser(user: User) {
    return await db.user.create({
      data: user,
    });
  }

  async updateUser(id: number, user: User) {
    return await db.user.update({
      where: { id },
      data: user,
    });
  }
}

export const userService = new UserService();
