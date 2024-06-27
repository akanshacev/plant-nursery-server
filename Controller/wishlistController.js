const wishlists = require('../Model/wishlistModel')

exports.addtoWish=async(req,res)=>{
    try{
        const plantId=req?.params.id
    console.log("plant==",plantId);

    const currentuser=req.payload
    console.log(currentuser)
    
    let userwish=await wishlists.findOne({userId:currentuser})
    if(userwish){
        const existingPlant= await wishlists.findOne({ $and:[{userId:currentuser},{plants:{$elemMatch:{plantId}}}]})
        if(existingPlant){
            return res.status(406).json("Plant Already Added!!")
        }
        else{
            const newplant={
                plantId
            }
            await wishlists.findByIdAndUpdate({userId:currentuser},{$inc:{totalquantity:1},$push:{plants:newplant}})
            return res.status(200).json("plant added to wishlist")
        }
    }
    else{
        const newWishlist=new wishlists({
            userId:currentuser,
            plants:[
                {
                    plantId:plantId
                }
            ],
            totalquantity:1
        })
        newWishlist.save()
        return res.status(200).json("new Wishlist Created")
    }
    }
    catch(error){
        console.log(error);
        res.status(error.status || 500).json({ message : error.message || "Internal Server Error"})
    }
    
}

// const plants = require('../Model/plantModel')

// exports.addToWishlist=async(req,res)=>{
//     const {plantName,plantType,image,plantWater,plantMRP,plantMaintanance,description}=req.body
//     const userId = req.payload

//     const existingPlant=await wishlists.findOne({userId,plantName})

// }

// exports.addtowishlist = async (req, res) => {
//     try {
//         let wishlist = await wishlists.findOne({ userId: req.params.userId })
        // if (!wishlist) {
//             wishlist = new wishlists({ userId: req.params.userId, plants: [] })
//         }
//         const plant = await plants.findById(req.params.plantId)
//         if (!plant) {
//             return res.status(404).json("Plant Not Found")
//         }
//         wishlist.plants.push({ plantId: req.params.plantId })
//         await wishlist.save()
//         res.status(201).json(wishlist)
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json(err)
//     }
  
// }