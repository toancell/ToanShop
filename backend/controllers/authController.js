import userModel from "../models/userModel.js";
import { hashPassword,comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken"
export const registerController = async (req,res) =>{
    try{
        const {name,email,password,phone,address} = req.body;
        if(!name){
            return res.send({error:"Name is required"})
        } 
        if(!email){
            return res.send({error:"Email is required"})
        }
        if(!password){
            return res.send({error:"Password is required"})
        }
        if(!phone){
            return res.send({error:"Phone is required"})
        }
        if(!address){
            return res.send({error:"Address is required"})
        }
        // check user
        const exisitingUser = await userModel.findOne({email})
        // existing user 
        if(exisitingUser){
            return res.status(200).send({
                success: true,
                message: "Already register please login",
            })
        } 
        // register user
        const hashedPassword = await hashPassword(password) // ma hoa password
        // save
        const user= await new userModel({name, email, password: hashedPassword,phone,address}).save();
        res.status(201).send({
            success: true,
            message: "User register successfully",
            user,
        });
    } catch(err){
        res.status(500).send({
            success: false,
            message: " Error in Registeration",
            err,
        })
    }

}

export const loginController = async (req, res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            })
        }
        // check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email not found",
            })
        }
        const match =await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid password",
            })
        }
        //token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.status(200).send({
            success: true,
            message: "Login succesfully",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            err
        })
    }
}