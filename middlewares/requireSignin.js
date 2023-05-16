import JWT from "jsonwebtoken";
import users from "../models/userModels.js";
export const signInrequire =  (req, res, next) => {
  console.log("they are here for signINrequire");
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
   // console.log(decode);
    req.user=decode;
    next();
  } catch (error) {
    
    console.log(error,"some error in signinrequire");
  }
};
export const adminChecker=async (req,res,next)=>{
        try {
            const user=await users.findById(req.user._id);
            //onsole.log(user);
            if(user.role===1) next();
            else{
                return res.status(400).send(
                    {
                        message:"unauthorize access",
                        status:"400"
                        
                    }
                )
            }
        } catch (error) {
                console.log(error); 
        }
}
