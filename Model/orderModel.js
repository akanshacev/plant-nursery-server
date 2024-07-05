const mongoose = require('mongoose')


const getCurrentLocalTime = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset(); // Offset in minutes
    return new Date(date.getTime() - (offset * 60 * 1000)); // Adjusting to local time
};


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
    },
    createAt:{
        type:Date,
        default:getCurrentLocalTime
    }
})
const orders = mongoose.model('orders', oderSchema)
module.exports = orders