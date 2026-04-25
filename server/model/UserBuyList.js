const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userEmail: String,

    productName: String,

    price: Number,

    image: String,

    quantity: Number,

    total: Number
});

module.exports = mongoose.model("Cart", cartSchema);