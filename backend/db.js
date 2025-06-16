const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://priynka0004:P.chauhan1706@cluster0.v3np56g.mongodb.net/GoFoodMERN?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetched_data;
        console.log("Food items loaded:", global.food_items.length);

        const categoryData = await mongoose.connection.db.collection("food_category").find({}).toArray();
        global.foodCategory = categoryData;
        console.log("Food categories loaded:", global.foodCategory.length);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};


module.exports = connectToMongo;
