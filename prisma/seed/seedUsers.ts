import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { db } from "../../src/utils/db";

export const seedUsers = async () => {
  type UserJson = {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    pin: string;
    role: string;
  };
  const usersFromJson = require("./data/users.json");
  const users: User[] = usersFromJson.map((user: UserJson) => {
    user.pin = user.pin?.length === 4 ? user.pin : randomUUID();
    return {
      id: Number(user.id),
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      password: user.password,
      pin: user.pin,
      role: user.role,
    };
  });
  return await db.user.createMany({
    data: users,
  });
};
