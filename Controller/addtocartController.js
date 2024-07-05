const { default: mongoose } = require('mongoose');
const carts = require('../Model/cartModel');
const plants = require('../Model/plantModel');

exports.addtocart = async (req, res) => {
    try {
        const plantId = req?.params.id
        console.log("plant=", plantId);


        const currentuser = req.payload
        console.log(currentuser);

        let userCart = await carts.findOne({ userId: currentuser })
        if (userCart) {
            const existingPlant = await carts.findOne({ $and: [{ userId: currentuser }, { plants: { $elemMatch: { plantId } } }] });
            if (existingPlant) {
                const quantityUpdate = await carts.findOneAndUpdate({ $and: [{ userId: currentuser }, { "plants.plantId": plantId }] }, { $inc: { "plants.$.quantity": 1 } });
                return res.status(200).json("already existed,Qunatity Increased")
            }
            else {
                const newPlant = {
                    plantId,
                    quantity: 1
                }
                await carts.findOneAndUpdate({ userId: currentuser }, { $inc: { totalquantity: 1 }, $push: { plants: newPlant } })
                return res.status(200).json("plant added to cart")

            }
        }
        else {
            const newCart = new carts({
                userId: currentuser,
                plants: [
                    {
                        plantId: plantId,
                        quantity: 1
                    }
                ],
                totalquantity: 1
            })
            newCart.save()
            return res.status(200).json("new cart created")

        }
    }
    catch (error) {
        console.log(error)
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })
    }

}
exports.getCartItems = async (req, res) => {
    try {
        const currentUser = req.payload;
        console.log(currentUser);

        let userCart = await carts.findOne({ userId: currentUser }).populate('plants.plantId');

        if (!userCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        // console.log("inside user cart")
        return res.status(200).json(userCart);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
}

exports.removeCartitem = async (req, res) => {
    try {
        const plantId = new mongoose.Types.ObjectId(req.params.id)
        const currentUser = req.payload
        let cart = await carts.findOne({ userId: currentUser })
        const cartId = cart._id

        let update = await carts.findByIdAndUpdate({ _id: cartId, plants: { $elemMatch: { plantId: plantId } } }, {
            $pull: { plants: { plantId: plantId } },
            $inc: { totalquantity: -1 }
        })

        if (update) {
            res.status(200).json("Product Deleted From cart")
        } else {
            res.status(400).json("Unable to delete")
        }
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
}

exports.updateCartQuantity = async (req, res) => {
    try {
        const plantId = req.params.id
        const { quantity } = req.body
        const currentUser = req.payload

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" })
        }
        let cart = await carts.findOne({ userId: currentUser })

        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found" })
        }

        const plantIndex = cart.plants.findIndex(item => item.plantId.toString() === plantId)
        if (plantIndex === -1) {
            return res.status(404).json({ message: "plant not found in cart" })
        }

        cart.plants[plantIndex].quantity = quantity;
        await cart.save()

        res.status(200).json(cart)
    }catch(error){
        console.log(error);
        res.status(error.status || 500).json({message:error.message || "Internal Server Error"})
    }
    
}

