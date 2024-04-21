import express from "express";
import tableRouter from "./table/table.router";
import menuCategoryRouter from "./menuCategory/menuCategory.router";
import menuItemRouter from "./menuItem/menuItem.router";
import orderRouter from "./order/order.router";
import orderItemRouter from "./orderItem/orderItem.router";
import trafficRouter from "./traffic/traffic.router";
import loginRouter from "./login/login.router";
import { createRouter } from "./utils/router";
import { db } from "./utils/db";

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
apiRoutes.use(trafficRouter)

app.use("/api/v1", apiRoutes)

const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
