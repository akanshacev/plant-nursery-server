const mongoose = require('mongoose')

const cartshema = new mongoose.Schema({
    plants: [
        {
            plantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "plants",
                require: true
            },
            quantity: {
                type: Number,
                default: 1
            },

        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",    
    },
    totalquantity:{
        type:Number,

    }


})

const carts = mongoose.model('carts', cartshema)

module.exports = carts