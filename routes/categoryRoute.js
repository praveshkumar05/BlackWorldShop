import express from "express"
import { categoryContoller, createcategoryContoller, singleCategoryController,updateCategorycontroller,deleteCategoryController } from "../controller/categoryController.js";
import { adminChecker, signInrequire } from "../middlewares/requireSignin.js";
const router=express.Router();

router.post("/createCategory",signInrequire,adminChecker,createcategoryContoller);
router.put("/updateCategory/:id",signInrequire,adminChecker,updateCategorycontroller);
router.get("/getcategory",categoryContoller);
router.get("/singleCategory/:slug",singleCategoryController);
router.delete("/deleteCategory/:id",signInrequire,adminChecker,deleteCategoryController);
export default router;
