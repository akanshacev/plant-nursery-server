const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    
    plants: [
        {
            plantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "plants",
                require: true
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",    
    },
    totalquantity:{
        type:Number,

    }
});

const wishlists = mongoose.model('wishlists', wishlistSchema);
module.exports = wishlists