const  express = require('express')
const userController=require('../Controller/userController')
const plantController=require('../Controller/plantController')
const wishlistController=require('../Controller/wishlistController')
const router=express.Router()
const jwtMiddleware=require('../Middleware/jwtMiddleware')
const multerconfig = require('../Middleware/multerMiddleware')
const addtocartController = require('../Controller/addtocartController')
const orderController = require('../Controller/orderContoller')


router.post('/reg',userController.userRegister)
router.post('/login',userController.userLogin)

router.post('/addPlant',jwtMiddleware,multerconfig.single("image"),plantController.addPlants)
router.get('/allplantA',jwtMiddleware,plantController.allPlantsA)
router.get('/allplantsU',jwtMiddleware,plantController.allPlantsU)
router.put('/edit-plant/:pid',jwtMiddleware,multerconfig.single('image'),plantController.editPlant)
router.delete('/deleteplant/:pid',jwtMiddleware,plantController.removeplant)

router.post('/addtocart/:id',jwtMiddleware,addtocartController.addtocart)
router.get('/getcart',jwtMiddleware,addtocartController.getCartItems)
router.put('/rmcartitem/:id',jwtMiddleware,addtocartController.removeCartitem)

router.post('/addtowishlist/:id',jwtMiddleware,wishlistController.addtoWish)
router.get('/getwish',jwtMiddleware,wishlistController.getwish)
router.put('/rmwish/:id',jwtMiddleware,wishlistController.removeWhlist)

router.post('/placeOrder/',jwtMiddleware,orderController.placeOrder)
router.get('/getorder',jwtMiddleware,orderController.getOrders)
module.exports=router