import { Prisma, PrismaClient } from "@prisma/client";
export const db = new PrismaClient({
  //   log: [
  //     {
  //       emit: "event",
  //       level: "query",
  //     },
  //     {
  //       emit: "stdout",
  //       level: "error",
  //     },
  //     {
  //       emit: "stdout",
  //       level: "info",
  //     },
  //     {
  //       emit: "stdout",
  //       level: "warn",
  //     },
  //   ],
});

// db.$on("query", (e) => {
//   console.log("Query: " + e.query);
//   console.log("Params: " + e.params);
//   console.log("Duration: " + e.duration + "ms");
// });

export const isNotFoundError = (error: any) =>
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === "P2025";

export const isForeignKeyConstraintError = (error: any) =>
  error instanceof Prisma.PrismaClientKnownRequestError &&
  error.code === "P2003";
