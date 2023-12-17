import userModel from "../models/userModel.js";
import { hashPassword,comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken"
import fs from "fs"
export const registerController = async (req,res) =>{
    try{
        const {name,email,password,phone,address} = req.fields;
        const {photo} = req.files
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
        if(!photo){
            return res.send({error:"Photo is required"})
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
        const user = new userModel({name, email, password: hashedPassword,phone,address});
        if(photo){
            user.photo.data =  fs.readFileSync(photo.path);
            user.photo.contentType = photo.type ;
        }
        await user.save();
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
        const user = await userModel.findOne({email}).select("-photo")
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
            user,
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
export const photoUser = async (req, res) => {
    try{
        const user = await userModel.findById(req.params.pid).select("photo")
        if(user.photo.data){
            res.set("Content-type", user.photo.contentType)
            return res.status(200).send(user.photo.data)}
        }catch(err){
            console.log(err)
            res.status(500).send({
                success: false,
            })    
    }
}

export const getAllUsers = async (req, res) => {
    try{
        const user = await userModel.find({}).select("-photo")
        res.status(200).send({
            success: true,
            message: " Success",
            countTotal: user.length,
            user
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
                success: false,
        }) 
    }
}