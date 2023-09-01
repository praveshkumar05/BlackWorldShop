
import slugify from "slugify";
import categoryModels from "../models/categoryModels.js";
export const createcategoryContoller=async(req,res)=>{
    
        try {
                //  console.log("han yha tak ok hai")
                const {name}=req.body;
                if(!name)
                {
                    return res.status(401).send({message:"name is required"});
                }
                const existingCateogry=await categoryModels.findOne({name});
                if(existingCateogry)
                {       
                    // console.log("user alread exist");
                   return  res.status(400).send({
                        success:false,
                        message:"Category ALready Exist"
                    })
                }
                const category=await new categoryModels({name,slug:slugify(name)}).save();
                  return res.status(201).send({
                    success:true,
                    message:"new category created",
                    category
                })
            
        } catch (error) {
                console.log(error);
                return res.status(401).send({
                    status:401,
                    message:"error while creating the category"

                })
        }

}
export const updateCategorycontroller=async(req,res)=>{
    try {

        const {name}=req.body;
        const {id}=req.params;
        const category=await categoryModels.findByIdAndUpdate(id,{name:name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            message:" category Updated",
            category
        })
        
    } catch (error) {
        console.log(error);
     return res.status(401).send({
            status:401,
            message:"while updating the category"
        })
}
}
export const categoryContoller=async(req,res)=>{
        try {

            const category=await categoryModels.find({});

            res.status(200).send(
                {
                     success:true,
                     message:" category Updated",
                     category

                }
            )
            
        } catch (error) {

            console.log(error);
            return res.status(401).send({
                   status:401,
                   message:"while getting the category"
               })
            
        }
}
export const singleCategoryController=async(req,res)=>{
    try {
            
            const cateogory=await categoryModels.findOne({slug:req.params.slug})
            console.log(cateogory);
            res.status(200).send(
                {
                     success:true,
                     message:" Got single cateogry  Sucessfully",
                     cateogory

                })
    } catch (error) {
        return res.status(401).send({
            status:401,
            message:"while getting the single category"
        })
        
    }

}
export const deleteCategoryController=async (req,res)=>{

    try {
        const {id}=req.params;
        console.log(id);
        const result=await categoryModels.findByIdAndDelete(id);
            return res.status(200).send({
                success:true,
                message:"category SuccessfulLy Deleted",
                result
            })    
    }
     catch (error) {
        console.log(error)
        return res.status(401).send({
            status:401,
            message:" Error while deleting  category"
        })
        
    }

}