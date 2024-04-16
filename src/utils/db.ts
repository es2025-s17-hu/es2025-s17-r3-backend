import { Prisma, PrismaClient } from '@prisma/client';
export const db = new PrismaClient();

export const isNotFoundError = (error: any) => error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";