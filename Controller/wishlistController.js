const { default: mongoose } = require('mongoose');
const wishlists = require('../Model/wishlistModel');
const plants = require('../Model/plantModel');

exports.addtoWish = async (req, res) => {
    try {
        const plantId = req?.params.id;

        const userId = req.payload; 
        console.log(userId);

        let userwish = await wishlists.findOne({ userId });
        if (userwish) {
            const existingPlant = await wishlists.findOne({ $and: [{ userId }, { plants: { $elemMatch: { plantId } } }] });
            if (existingPlant) {
                return res.status(400).json("Plant Already Added!!");
            } else {
                const newPlant = {
                    plantId
                };
                await wishlists.findByIdAndUpdate(userwish._id, { $inc: { totalquantity: 1 }, $push: { plants: newPlant } });
                return res.status(200).json("Plant added to wishlist");
            }
        } else {
            const newWishlist = new wishlists({
                userId,
                plants: [
                    {
                        plantId: plantId
                    }
                ],
                totalquantity: 1
            });
            await newWishlist.save();
            return res.status(200).json("New Wishlist Created");
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
};

exports.getwish = async(req,res)=>{
    try {
        const currentUser = req.payload;
        console.log(currentUser);

        let userWish = await wishlists.findOne({ userId: currentUser }).populate('plants.plantId');
        
        if (!userWish) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        // console.log("inside user cart")
        return res.status(200).json(userWish);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
}

exports.removeWhlist=async(req,res)=>{
    try{
        const plantId = new mongoose.Types.ObjectId(req.params.id)
        const curentUser = req.payload
        let wishlist = await wishlists.findOne({userId:curentUser})
        const wishlistId=wishlist._id
    
        let update = await wishlists.findByIdAndUpdate({_id:wishlistId,plants:{$elemMatch:{plantId:plantId}}},{
            $pull:{plants:{plantId:plantId}},
            $inc:{totalquantity:-1}
        })
        if(update){
            res.status(200).json("Product deleted from the wishlist")
        }
        else{
            res.status(400).json("Unable to delete")
        }
    }
    catch(error){
        console.log(error);
        res.status(error.status || 500).json({message:error.message || "Internal Server Error"})
    }
   
}