const jwt=require('jsonwebtoken')

const jwtMiddlewareFun=(req,res,next)=>{
    console.log("Inside jwxMiddleware");
    try{
        const token=req.headers.authorization.split(" ")[1]
        if(token){
            const result=jwt.verify(token,process.env.secret_key)
            console.log(result);
            req.payload=result.userId
            next()
        }
        else{
            res.status(406).json("Please Login First")
        }
    }
    catch(error){
        console.log(error)
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" })    }
   
   
}

module.exports=jwtMiddlewareFun