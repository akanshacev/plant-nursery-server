const plants = require('../Model/plantModel')
const wishlists = require('../Model/wishlistModel')

exports.addtowishlist = async (req, res) => {
    try {
        let wishlist = await wishlists.findOne({ userId: req.params.userId })
        if (!wishlist) {
            wishlist = new wishlists({ userId: req.params.userId, plants: [] })
        }
        const plant = await plants.findById(req.params.plantId)
        if (!plant) {
            return res.status(404).json("Plant Not Found")
        }
        wishlist.plants.push({ plantId: req.params.plantId })
        await wishlist.save()
        res.status(201).json(wishlist)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
  
}