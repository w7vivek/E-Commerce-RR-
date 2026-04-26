const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require("fs");

const User = require('./model/UserData.js');
const Products = require('./model/ProductData.js');
const Cart = require('./model/UserBuyList.js');
const UserAddress = require('./model/PaymentDetails.js');

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

require('dotenv').config();
const app = express();
const PORT = 5000;

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   MONGODB CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URL)

.then(() => {

    app.listen(PORT, () => {

        console.log(`Server Running On ${PORT}`);
        console.log("MongoDB Connected");

    });

})

.catch((error) => {

    console.log("Database Error:", error);

});

/* =========================
   USER REGISTER
========================= */
app.post('/registerData', async (req, res) => {

    try {

        const data = await User.create(req.body);

        res.status(201).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Register Failed"
        });

    }

});

/* =========================
   USER LOGIN
========================= */
app.post('/auth', async (req, res) => {

    try {

        const { email, password } = req.body;

        const foundUser = await User.findOne({
            email,
            password
        });

        if (foundUser) {

            res.status(200).json({
                message: "Login Success",
                user: foundUser
            });

        } else {

            res.status(401).json({
                message: "Invalid Credentials"
            });

        }

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

/* =========================
   GET USERS
========================= */
app.get('/userData', async (req, res) => {

    try {

        const data = await User.find();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "User Fetch Failed"
        });

    }

});

/* =========================
   GET PRODUCTS
========================= */


app.get('/productDetails', async (req, res) => {

    try {

        const data = await Products.find();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Product Fetch Failed"
        });

    }

});

/* =========================
   ADD PRODUCT
========================= */
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const upload = multer({ dest: "uploads/" });

app.post('/addProduct', upload.single("image"), async (req, res) => {

    try {

        const result = await cloudinary.uploader.upload(req.file.path);

        const data = await Products.create({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            image: result.secure_url
        });

        res.status(201).json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});

/* =========================
   DELETE PRODUCT
========================= */
app.delete('/adminDeleteProduct/:id', async (req, res) => {

    try {

        const data =
            await Products.findByIdAndDelete(
                req.params.id
            );

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Delete Failed"
        });

    }

});

/* =========================
   UPDATE PRODUCT
========================= */
app.put('/productData/:id', upload.single("image"), async (req, res) => {

    try {

        let imageUrl = req.body.existingImageUrl;

        /* If new image selected */
        if (req.file) {

            const result =
                await cloudinary.uploader.upload(
                    req.file.path
                );

            imageUrl = result.secure_url;
        }

        const data =
            await Products.findByIdAndUpdate(

                req.params.id,

                {
                    name: req.body.name,
                    category: req.body.category,
                    price: req.body.price,
                    stock: req.body.stock,
                    image: imageUrl
                },

                { new: true }

            );

        res.status(200).json(data);

    } catch (error) {

        console.log("Update error:", error);

        res.status(500).json({
            message: "Update Failed"
        });

    }

});

/* =========================
   ADD TO CART
========================= */
app.post('/addUserproduct', async (req, res) => {

    try {

        const data = await Cart.create(req.body);

        res.status(201).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Cart Add Failed"
        });

    }

});

/* =========================
   GET CART
========================= */
app.get('/cart/:email', async (req, res) => {

    try {

        const data = await Cart.find({
            userEmail: req.params.email
        });

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Cart Fetch Failed"
        });

    }

});

/* =========================
   DELETE CART PRODUCT
========================= */
app.delete('/deleteProduct/:id', async (req, res) => {

    try {

        const data =
            await Cart.findByIdAndDelete(
                req.params.id
            );

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Delete Failed"
        });

    }

});

/* =========================
   SAVE ADDRESS
========================= */
app.post('/saveAddress', async (req, res) => {

    try {

        const data =
            await UserAddress.create(
                req.body
            );

        res.status(201).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Address Save Failed"
        });

    }

});

/* =========================
   ADMIN USERS
========================= */
app.get('/buyList-customerData', async (req, res) => {

    try {

        const data = await User.find();

        const filteredData = data.filter(
            (user) => user.email !== "admin@workforce.com"
        );

        res.status(200).json(filteredData);

    } catch (error) {

        res.status(500).json({
            message: "Customer Fetch Failed"
        });

    }

});


// Get the cart data
app.get('/allCartData', async (req, res) => {

    try {

        const data = await Cart.find();

        res.status(200).json(data);

    } catch (error) {

        res.status(500).json({
            message: "Cart Fetch Failed"
        });

    }

});