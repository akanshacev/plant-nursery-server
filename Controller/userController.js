const users = require("../Model/userModel")
const jwt = require("jsonwebtoken")

exports.userRegister = async (req, res) => {
    const { username, password, email } = req.body
    // console.log(username,password,email);
    console.log("inside register function")
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(401).json("user alredy exist")
        }
        else {
            const newUser = new users({
                username, password, email, profile: ""
            })
            await newUser.save()
            res.status(201).json(newUser)
        }
    }
    catch(err){
        res.status(404).json(err)
    }  
}


exports.userLogin = async(req,res)=>{
    const {email,password}=req.body
    try{
        const existingUser =await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({email:existingUser.email,username:existingUser.username,userId:existingUser._id},process.env.secret_key)
            const rest={token,user:existingUser.username}
            console.log(token);
            res.status(200).json(rest)
            
        }
        else{
            res.status(406).json("Invalid Username/Password")
        }
    }
    catch(err){
        res.status(401).json(err)
    }
  

}