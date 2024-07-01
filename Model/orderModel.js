const mongoose = require('mongoose')

const oderSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    address: {
        userName:{
            type:String
        },
        houseName:{
            type:String
        },
        homeTown: {
            type: String,
        },
        post: {
            type: String,
        },
        pinCode: {
            type: String,
        },
        mobileNumber: {
            type: String,
        },

    },
    paymentmode: {
        type: String,
    },

    orderItems: [
        {
            plantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "plants",
                require: true
            },
            quantity: {
                type: Number,
            },

        }
    ],
    totalQuantity:{
        type:String
    },
    totalAmount:{
        type:String
    }
})
const orders = mongoose.model('orders', oderSchema)
module.exports = orders