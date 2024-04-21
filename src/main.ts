import express from "express";
import tableRouter from "./table/table.router";
import menuCategoryRouter from "./menuCategory/menuCategory.router";
import menuItemRouter from "./menuItem/menuItem.router";
import orderRouter from "./order/order.router";
import orderItemRouter from "./orderItem/orderItem.router";
import statsRouter from "./stats/stats.router";
import loginRouter from "./login/login.router";
import { createRouter } from "./utils/router";
import { db } from "./utils/db";
import fs from "fs";

const app = express();
const port = 5000; // Port where the app will listen

app.use(express.json());

app.use((_, res, next) => {
  //res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "*");
  next();
});

const apiRoutes = createRouter()

apiRoutes.use(loginRouter)

apiRoutes.post("/reset-db", async (req, res) => {
  try {
		// ignore foreign key checks
		await db.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0;")
		await db.$executeRawUnsafe("DROP TABLE IF EXISTS `MenuCategory`")
		await db.$executeRawUnsafe("DROP TABLE IF EXISTS `MenuItem`")
		await db.$executeRawUnsafe("DROP TABLE IF EXISTS `Order`")
		await db.$executeRawUnsafe("DROP TABLE IF EXISTS `OrderItem`")
		await db.$executeRawUnsafe("DROP TABLE IF EXISTS `Table`")
		await db.$executeRawUnsafe("DROP TABLE IF EXISTS `User`")
    await db.$executeRawUnsafe("DROP TABLE IF EXISTS `_prisma_migrations`")
		await db.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1;")

		console.log("Loading dump from:")
		console.log(process.cwd() + "/dineease.sql")

		//  load dump.sql and run it
		const dump = fs
			.readFileSync(process.cwd() + "/dineease.sql", "utf-8")
      .replace(/\r\n/g, "\n")
			.split("\n")
			.filter(Boolean)
			.filter((line) => !line.startsWith("--"))
			.join(" ")
			.split(";")
			.filter(Boolean)

		for (const query of dump) {
      if (query.trim().startsWith("START TRANSACTION") || query.trim().startsWith("COMMIT") || query.trim() === "") {
        continue
      }
      try {
        await db.$executeRawUnsafe(query.trim() + ";")
      } catch (error) {
        console.error("Error executing query: ", query)
        console.error(error)
        throw error
      }
		}
		console.log("The database reset was successful")
		res.send({ message: "The database reset was successful" })
	} catch (error) {
		console.error(error)
		res.status(500).send({ error: "Database reset failed" })
	}
})

apiRoutes.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
    return;
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    db.user.findFirst({
      where: {
        token,
      },
    }).then((user) => {
      if (!user) {
        return res.status(401).send("Unauthorized");
      }
      next();
    });
  } catch (error) {
    console.error("Error authorizing: ", error);
    res.status(500).send("Error authorizing");
  }
})

apiRoutes.use(tableRouter)
apiRoutes.use(menuCategoryRouter)
apiRoutes.use(menuItemRouter)
apiRoutes.use(orderRouter)
apiRoutes.use(orderItemRouter)
apiRoutes.use(statsRouter)

app.use("/api/v1", apiRoutes)

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
