import express from "express";
import restaurantRouter from "./restaurant/restaurant.router";
import tableRouter from "./table/table.router";
import menuCategoryRouter from "./menuCategory/menuCategory.router";
import menuItemRouter from "./menuItem/menuItem.router";
import orderRouter from "./order/order.router";
// import orderItemRouter from "./orderItem/orderItem.router";

const app = express();
const port = 5000; // Port where the app will listen

app.use(express.json());

// GET /restaurant endpoint to fetch restaurant details
app.use((_, res, next) => {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "*");
  next();
});

const routers = [
  restaurantRouter,
  tableRouter,
  menuCategoryRouter,
  menuItemRouter,
  orderRouter,
];
for (const router of routers) {
  app.use("/api/v1/", router);
}
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
