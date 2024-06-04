const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    plants: [{
        plantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'plants',
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const wishlists = mongoose.model('wishlists', wishlistSchema);
module.exports = wishlists