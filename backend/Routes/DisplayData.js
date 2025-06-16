const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        console.log("Sending Food Items:", global.food_items);
        console.log("Sending Food Categories:", global.foodCategory);
        res.send({ food_items: global.food_items, foodCategory: global.foodCategory });
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
});


module.exports = router;
