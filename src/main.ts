import express from 'express';
import restaurantRouter from './restaurant/restaurant.router';
import tableRouter from './table/table.router';
import menucardCategoryRouter from './menucardCategory/menucardCategory.router';
import menucardItemRouter from './menucardItem/menucardItem.router';

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

app.get('/menucardCategories', menucardCategoryRouter);
app.get('/menucardCategories/:id', menucardCategoryRouter);

app.get('/menucardItems', menucardItemRouter);
app.get('/menucardItems/menucardCategory/:menucardCategoryId', menucardItemRouter);
app.post('/menucardItems', menucardItemRouter);
app.put('/menucardItems/:id', menucardItemRouter);


const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});