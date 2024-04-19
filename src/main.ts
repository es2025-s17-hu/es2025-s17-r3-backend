import express from 'express';
import restaurantRouter from './restaurant/restaurant.router';
import tableRouter from './table/table.router';
import menuCategoryRouter from './menuCategory/menuCategory.router';
import menuItemRouter from './menuItem/menuItem.router';

const app = express();
const port = 5000; // Port where the app will listen

app.use(express.json());


// GET /restaurant endpoint to fetch restaurant details
app.use((req, res, next) => {
  res.set("Content-Type", "application/json")
  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.set("Access-Control-Allow-Headers", "*")
  next()
})

app.get('/restaurant', restaurantRouter);
app.put('/restaurant', restaurantRouter);

app.get('/tables', tableRouter);
app.post('/tables', tableRouter);
app.put('/tables/:id', tableRouter);

app.get('/menuCategories', menuCategoryRouter);
app.post('/menuCategories', menuCategoryRouter);
app.get('/menuCategories/:id', menuCategoryRouter);

app.get('/menuItems', menuItemRouter);
app.get('/menuItems/menuCategory/:menuCategoryId', menuItemRouter);
app.post('/menuItems', menuItemRouter);
app.put('/menuItems/:id', menuItemRouter);


const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});