const carts=require('../Model/cartModel')

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
        // const existingPlant = await carts.findOne({plantId,userId:currentuser})
        // console.log(existingPlant)
        // if(existingPlant){
        //     return res.json({
        //         message:"plant already added",
        //         success:true,
        //         error:false
        //     })
        // }
        // else{
        //     const payload={
        //         plantId:plantId,
        //         quantity:1,
        //         userId:currentuser
        //     }
        //     const newaddtocart = carts(payload)
        //     const savecart = await newaddtocart.save()
        //     res.json({
        //         data:savecart,
        //         message:"plant added",
        //         success:true,
        //         error:false
        //     })
        // }
    }
    catch(error){
        console.log(error)
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })    }
   
}