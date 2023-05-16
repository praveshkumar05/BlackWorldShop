import mongoose, { Schema } from "mongoose";

const productSchmea=new mongoose.Schema ({

   name:{
        type:String,
        required:true,
    },
    slug:{
         type:String,
         required:true   
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
         ref:'Category',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:String
    }

},{timestamps:true})

export default mongoose.model('products',productSchmea);