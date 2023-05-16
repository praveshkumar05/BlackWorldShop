import express from "express"
import { adminChecker, signInrequire } from "../middlewares/requireSignin.js";
import { createproductController, getproductController, productphotoController, singleproductController,deleteproductController ,productupdateController, productfilterController, prdouctCountController, prdouctListController, serachProductController, relatedProductController, proudctcategoryController, braintreeTokenController, braintreePaymentController} from "../controller/productController.js";
import formidable from 'express-formidable'
const router=express.Router();
// routes
router.post('/createProduct',signInrequire,adminChecker,formidable(),createproductController)
router.get('/getProduct',getproductController);
router.get('/getProduct/:slug',singleproductController);
router.get('/productPhoto/:pid',productphotoController);
router.delete('/deleteProduct/:id',deleteproductController);
router.put('/updateProduct/:id',signInrequire,adminChecker,formidable(),productupdateController)
router.post('/filterProduct',productfilterController)
// product count
router.get('/product-count',prdouctCountController)
// product per page
router.get('/product-list/:page',prdouctListController);
//serach product
router.get('/search/:keyword',serachProductController);
// similar product
router.get('/related-product/:pid/:cid',relatedProductController);
// categories wise product
router.get("/product-category/:slug",proudctcategoryController)
//payment routes 
//token 
router.get('/braintree/token',braintreeTokenController);
//payments
router.post('/braintree/payment',signInrequire, braintreePaymentController)
export default  router 