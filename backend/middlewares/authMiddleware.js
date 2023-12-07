import JWT from "jsonwebtoken"
import userModel from "../models/userModel";
export  const requireSignIn= async(req,res,next) => {
    try{
        const decode = JWT.verify(red.headers.authorization, process.env.JWT_SECRET);
        next();
    }catch(err){
        console.log(err)
    }

}
// admin access
export const isAdmin = async(req, res, next) => {
    try{
        const user = await  userModel.findById( req.user._id);
        if( user.role !==1){
            return res.status(401).send({
                success: false, 
                message: " UnAuthorized Access"
            })
        }else{
            next();
        }
    }catch(err){
        console.log(err)
    }
}