const mongoose=require('mongoose')

const plantSchema=new mongoose.Schema({
    plantName:{
        type:String,
        required:true
    },
    plantType:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    plantWater:{
        type:String,
        required:true
    },
    plantMRP:{
        type:Number,
        required:true
    },
    plantMaintanance:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const plants=mongoose.model('plants',plantSchema)
module.exports=plants