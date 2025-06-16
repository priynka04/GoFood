const express = require('express');
const cors = require('cors');         // Import cors
const app = express();
const port = 5000;
const connectToMong = require("./db");

connectToMong();

// Use cors middleware before your routes
app.use(cors({
  origin: 'http://localhost:3000',   // Allow requests only from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true                   // If you want to accept cookies/auth headers
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!----');
});

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/PlaceOrder"));
app.use('/api', require('./Routes/orders')); // or correct path

app.post('/api/foodData', (req, res) => {
  console.log("Serving food_items:", global.food_items);
  console.log("Serving foodCategory:", global.foodCategory);

  res.json({
    food_items: global.food_items || [],
    foodCategory: global.foodCategory || []
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
