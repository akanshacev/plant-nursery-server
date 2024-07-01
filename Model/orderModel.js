const mongoose = require('mongoose')

const oderSchema = mongoose.Schema({
    username: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        place:{
            type:String
        },
        pincode: {
            type: Number,
        },
        dist: {
            type: String,
        },
        state: {
            type: String,
        },
        locality: {
            type: String,
        },

    },
    paymentmode: {
        type: String,
    },
    userId: {
        type: String,
    },
    orderitem:[{
        plant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"plants",
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        plantMRP:{
            type:Number,
        },
        totalamount:{
            type:Number
        }
    }],

})
const orders = mongoose.model('orders', oderSchema)
module.exports = orders