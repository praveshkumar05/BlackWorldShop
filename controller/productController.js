import productModel from "../models/productModel.js";
import categoryModels from "../models/categoryModels.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from 'dotenv'
dotenv.config();
//payment gateway
const  gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

export const createproductController = async (req, res) => {
  try {
   // console.log("req.feild",req.fields);
    const { name, description, price, category, quantity, shipping } =req.fields;
    const { photo } = req.files;
   // console.log("bhai  ye photo hai dekh lo achhe se");
    switch (true) {
      case !name:
        return res.status(500).send({ success:false , error: "Name is required" });
      case !description:
        return res.status(500).send({success:false , error: "description is required" });
      case !price:
        return res.status(500).send({success:false , error: "price is required" });
      case !category:
        return res.status(500).send({success:false , error: "category is required" });
      case !quantity:
        return res.status(500).send({success:false , error: "quantity is required" });
      case !photo || photo.size > 1000000:
        return res.status(500).send({success:false , error: "photo is required" });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
    //  console.log("photo print",photo);
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "proudct created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "error in creating product",
    });
  }
};
export const getproductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting product",
    });
  }
};
export const singleproductController = async (req, res) => {
  try {
    const { slug } = req.params;
    // console.log("kya single product ke liye aa rha hu")
    const product = await productModel
      .findOne({ slug: slug })
      .select("-photo")
      .populate("category");
      res.status(201).send({
      success: true,
      product
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting single product",
    });
  }
};
export const productphotoController=async(req,res)=>{
    try {
        const product=await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data)
        {
            res.set('Content-Type',product.photo.contentType);
            return res.status(200).send( product.photo.data)
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in getting photo of product",
          });
        
    }
}
 
 export const productupdateController=async(req,res)=>{
  try {
    const { name, description, price, category, quantity, shipping } =req.fields;
    const { photo } = req.files;
    console.log("bhai  ye photo hai dekh lo achhe se",photo);
    switch (true) {
      case !name:
        return res.status(500).send({ success:false,message:  "Name is required" });
      case !description:
        return res.status(500).send({ success:false,message: "description is required" });
      case !price:
        return res.status(500).send({ success:false,message: "price is required" });
      case !category:
        return res.status(500).send({ success:false,message: "category is required" });
      case !quantity:
        return res.status(500).send({ success:false,message: "quantity is required" });
      // case !photo || photo.size > 1000000:
      // return res.status(500).send({ success:false,message: "photo is required" });
    }
    const product = await productModel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) },{new:true});
    if (photo) {
      //console.log(photo);
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
   
    res.status(201).send({
      success: true,
      message: "proudct updated successfully",
      product,
    });
  } 
  catch (error) {

        console.log(error);
        res.status(500).send({
          success:false,
          message:'error product is  Not updated',
        })
          
    }
 }

 export const deleteproductController=async(req,res)=>{
  try {
       // const {id}=req.body;
        const result=await productModel.findByIdAndDelete(req.params.id);
        
         res.status(200).send({
            success:true,
        })    
  } catch (error) {
        res.status(200).send({
          success: false,
          message: "error in getting photo of product",
        });    
  }
}
export const productfilterController=async(req,res)=>{
  try {
            const {checked,radio}=req.body;
            const args={};

            if(checked.length>0)args.category=checked;
            if(radio.length)args.price={$gte:radio[0],$lte:radio[1]};
            const product=await productModel.find(args).select("-photo");
            res.status(200).send({
              success:true,
              product
            })

  } catch (error) {
      console.log(error);
      res.status(400).send({
        success:false,
        message:'Error in Filtering The product'
      })
  }
}
export const prdouctCountController=async(req,res)=>{
  try {
    const total=await productModel.find({}).estimatedDocumentCount();
      res.status(200).send({
        success:true,
        total
      }
    )
  } catch (error) {
      console.log(error)
      res.status(400).send({
      success:false,
      message:"Error in Product Count"
      })
  }
}
// product list based on page
export const prdouctListController=async(req,res)=>{
  try {
      const perPage=4;
      const page=req.params?req.params.page:1
      const products=await productModel.find({}).select("-photo").skip((page-1)*(perPage)).limit(perPage).sort({createdAt:-1});
      res.status(200).send({
        success:true,
        products
      })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success:false,
      message:"error in per page ctrler",
      error
    })
    
  }
}
export const serachProductController=async(req,res)=>{
  try {
    const {keyword}=req.params;
    const result=await productModel.find({
      $or:[
        {name:{$regex:keyword,$options:"i"}},
        {description:{$regex:keyword,$options:"i"}}
      ]
    })
    .select("-photo");
    res.status(200).send({
      result
    })
    
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success:false,
      message:'error in search product',
      error
    })
    
  }
}
export const relatedProductController=async(req,res)=>{
  try {
    // console.log("kya yah aa rha rhai")
      const {pid,cid}=req.params;
      const products=await productModel.find({
        category:cid,
        _id:{$ne:pid}
      }).select("-photo").limit(20).populate("category");
        console.log(products);
        res.status(200).send({
        success:true,
        products
      })

  } catch (error) {
      console.lor(error);
      res.status(200).send({
        success:false,
        message:"error while gettting related Product",error

      })
  }
}
export const proudctcategoryController=async(req,res)=>{
  try {
     const category=await categoryModels.findOne({slug:req.params.slug})
     const product=await productModel.find({category}).populate('category').select("-photo")
     res.status(200).send({
      success:true,
      product
     })
  } catch (error) {
      console.log(error);
      res.status(200).send({
        success:false,
        message:"some error in getting category wise-product"

      })

  }
}
// payment gateway api
// token controller
export const braintreeTokenController=async(req,res)=>{
  try {
    gateway.clientToken.generate({},function(error,response){
      if(error){
        return res.status(500).send({
          success:false,
          message:error
        })
      }else{
          // console.log(response)
          res.status(200).send(response)
      }
    })
      
  } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"some error in payment token verification"
      })
  }
}
// payment controller
export const braintreePaymentController=async(req,res)=>{
  try {
      
      const {cartItem,nonce}=req.body
      let total=0
      cartItem.map((i)=>total+=i.price);
      let newTransaction=gateway.transaction.sale(
        {
        amount:total,
        paymentMethodNonce:nonce,
        options:{
          submitForSettlement:true
        }
       },
      function(error,result){
        if(result)
        {
          const order=new orderModel({
            products:cartItem,
            payment:result,
            buyer:req.user._id,
          }).save();
          res.json({ok:true})
        }
        else{
          res.status(500).send(error);
        }
      }
      )
       
    
  } catch (error) {
    console.log(error);
      res.status(500).send({
        success:false,
        message:"some error in payment "
      })
    
  }
}