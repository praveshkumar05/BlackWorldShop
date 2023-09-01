import express from "express"
import {registerController,logincontroller,testController,passwordreset,updatepasswordController, updateProfileController, getOrdersController, getAllOrdersController} from "../controller/usercontroller.js"
const router=express.Router();
import { signInrequire,adminChecker } from "../middlewares/requireSignin.js";
import { orderStatusController } from "../controller/usercontroller.js";
// REGISTER|| METHOD POST

router.post('/register',registerController);

// LOGIN || METHOD Post
router.post('/login',logincontroller);
//Test Routes

router.get("/test",signInrequire,adminChecker, testController);

// protected  user router auth

router.get('/user-auth',signInrequire,(req,res)=>{
        try {
                res.status(200).send({ok:true});
        } catch (error) {
                console.log(error);
        }
       
})

// protected  Admin router auth
router.get('/admin-auth',signInrequire,adminChecker,(req,res)=>{
        res.status(200).send({ok:true});
})

// for sending the link to email 
router .post('/sendlink',passwordreset)


// for updateing password
router.post('/updatepassword/:id/:token',updatepasswordController);
// for updating profile
router.post('/updateProfile',signInrequire,updateProfileController);
// ordersss
router.get("/orders",signInrequire,getOrdersController)

router.get("/all-orders",signInrequire,adminChecker,getAllOrdersController)

router.post("/order-status/:orderId",signInrequire,adminChecker,orderStatusController)
export default router;