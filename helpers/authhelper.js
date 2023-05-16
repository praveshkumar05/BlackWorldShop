import bcrypt from 'bcrypt'
import user from "../config/db.js"
export const hashPassword=async(planpassword)=>{
    
    try {
        const hashedpassword=await bcrypt.hash(planpassword,10);
              return hashedpassword
    } catch (error) {
            console.log(error);
    }
}
export const comparePassword=async(hashedpassword,planpassword)=>{
        try {
            const result=bcrypt.compare(planpassword,hashedpassword); 
                  return result;

        } catch (error) {
                console.log(error);
        }
}