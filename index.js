// loads .env files contents into proccess.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router=require('./Routes/routes')
require('./DB/connection')

// creating sever instance
const pnServer=express()

// configuring cors into server
pnServer.use(cors())

// configuring json conversion on server
pnServer.use(express.json())


// configuring routes to server
pnServer.use(router)

// serving uploading routes to server
pnServer.use('/upload',express.static('./upload'))


const PORT=3001

// calling listen method to impliment listen node for server to run
pnServer.listen(PORT,()=>{
    console.log(`Server is running at :${PORT}`);
})

pnServer.get('/',(req,res)=>{
    res.status(200).send("<h1>The get request Hit successfully!!</h1>")
})