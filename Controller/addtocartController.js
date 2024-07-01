const { default: mongoose } = require('mongoose');
const carts=require('../Model/cartModel');
const plants = require('../Model/plantModel');

exports.addtocart=async(req,res)=>{
    try{
        const plantId=req?.params.id
        console.log("plant=",plantId);

    
        const currentuser=req.payload
        console.log(currentuser);

        let userCart=await carts.findOne({userId:currentuser})
        if(userCart){
            const existingPlant =  await carts.findOne({ $and: [{ userId:currentuser }, { plants: { $elemMatch: { plantId } } }] });
            if(existingPlant){
                const quantityUpdate=await carts.findOneAndUpdate({ $and: [{ userId:currentuser }, { "plants.plantId": plantId }] }, { $inc: { "plants.$.quantity": 1 } });
                return res.status(200).json("already existed,Qunatity Increased")
            }
            else{
                const newPlant= {
                    plantId,
                    quantity:1
                }
                await carts.findOneAndUpdate({ userId: currentuser }, { $inc: { totalquantity: 1 }, $push: { plants: newPlant } })
                return res.status(200).json("plant added to cart")

            }
        }
        else{
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
    catch(error){
        console.log(error)
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })    }
   
}
exports.getCartItems = async(req,res)=>{
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

exports.removeCartitem =async (details)=>{
    const catid = new mongoose.Types.ObjectId(details.carts)
    const plantId= new mongoose.Types.ObjectId(details.plants)
    return await new Promise((resolve,reject)=>{
         carts.findByIdAndUpdate({_id:catid,plants:{$elemMatch:{plantId:plantId}}},{
            $pull:{plants:{plantId:plantId}},
            $inc:{totalquantity:-1}
         }).then((data)=>{
            resolve({removePlant:true})
         })
    })
}

