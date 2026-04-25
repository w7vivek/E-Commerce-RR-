const mongoose = require('mongoose');

const AddressSchema =new mongoose.Schema({

    email:String,

    address:String,

    phone:String

});

module.exports = mongoose.model( "UserAddress",AddressSchema);