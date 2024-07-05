const carts = require('../Model/cartModel');
const plants = require('../Model/plantModel');
const orders = require('../Model/orderModel')



exports.placeOrder = async(req,res)=>{
    try {
        let currentUser = req.payload
        console.log(req.body,"req.body",currentUser)
        let cart = await carts.findOne({ userId: currentUser })

        let totalAmount = 0;

       
        const cartItems = await Promise.all(cart.plants.map(async (item) => {
          const plantDetails = await plants.findById(item.plantId);
          const itemTotal = plantDetails.plantMRP * item.quantity;
          totalAmount += itemTotal;
          return { ...item.toObject(), plantDetails, itemTotal };
        }));
        console.log(totalAmount,"total Amount");
        const newOrder = new orders({
            userId:currentUser,
            address:req.body,
            paymentmode:"cash on delvery",
            orderItems:cart.plants,
            totalQuantity:cart.totalquantity,
            totalAmount
        })

        const saveOrder =await newOrder.save()
        console.log(saveOrder,"order saved");
        await carts.deleteOne({_id:cart._id})
        
        res.status(200).json({message:"order placed successfully",saveOrder})
      
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
}

exports.getOrders = async(req,res)=>{
    try {
        const currentUser = req.payload;
        console.log(currentUser);

        let order = await orders.find().populate('orderItems.plantId').sort({ createAt: -1 });
        
        if (!order) {
            return res.status(404).json({ message: "No Orders Found" });
        }
        return res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
}
