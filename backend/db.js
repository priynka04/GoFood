require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetched_data;
        console.log("Food items loaded:", global.food_items.length);

        const categoryData = await mongoose.connection.db.collection("food_category").find({}).toArray();
        global.foodCategory = categoryData;
        console.log("Food categories loaded:", global.foodCategory.length);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Optional: rethrow so your app can fail gracefully
    }
};

module.exports = connectToMongo;