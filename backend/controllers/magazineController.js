import slugify from "slugify";
import fs from "fs";
import magazineModel from "../models/magazineModel.js";
export const magazineCreatePostController = async (req,res) =>{
    try{
        const {title,slug,description} = req.fields;
        const {photo} = req.files
        const magazine = new magazineModel({
            title,description, slug: slugify(title),
        })
        if(photo){
            magazine.photo.data = fs.readFileSync(photo.path);
            magazine.photo.contentType = photo.type;
        }
        await magazine.save()
        res.status(201).send({
            success: true,
            message: " success",
            magazine
        })
    }catch(error){
        res.status(500).send({
            success: false,
            message:"Fail",
            error
        })
    }
}
export const getMagazinePostController = async (req, res) =>{
    try{
        const magazine= await magazineModel.find({}).select("-photo")
        res.status(200).send({
            success: true,
            countTotal: magazine.length,
            message: "Success",
            magazine
        })
    }catch(err){
        res.status(500).send({
            success: false,
            message: "Failed",
            err
        })
    }
}
export const getSingleMagazinePost = async (req, res) =>{
    try{
        const magazine = await magazineModel.findOne({ slug: req.params.slug}).select("-photo")
        res.status(200).send({
            success: true,
            message: "Success",
            magazine
        })
    }catch(err){
        res.status(500).send({
            message: "Failed",
            success: false,
            err
        })
    }
}
export const getPhotoMagazine = async (req, res) =>{
    try{
        const magazine = await magazineModel.findById(req.params.mid).select("photo")
        if(magazine.photo.data){
            res.set('Content-type', magazine.photo.contentType)
            return res.status(200).send(magazine.photo.data)
        }
    }catch(err){
        res.status(500).send({
            message: "Failed",
            success: false,
            err
        })
    }
    
}