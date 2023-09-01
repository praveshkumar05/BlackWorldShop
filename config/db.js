import mongoose from "mongoose";
const connectDB=async()=>{
   try {
    const conn=await mongoose.connect(process.env.MONOGO_URL);
    console.log("dataabase connected");
   } catch (error) {
        console.log(`Error in MOngoDb ${error}`)
   }
}
export default connectDB