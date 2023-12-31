import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"
export const categoryController = async (req,res) =>{
    try{
        const {name} = req.body;
        if(!name) {return res.status(401).send({message:" Require name"})}
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send(
                {
                    success: true,
                    message: " Category already exists"
            }
            )
        } 
        const category = await new categoryModel({name, slug: slugify(name),}).save()
        res.status(201).send({
            success: true,
            message: " newCategory was created successfully",
            category,
        })
    } catch(e){
        console.log(e)
        res.status(500).send({
            success: false,
            message: "Failed",
            e,
        })
    }
}

export const updateCategoryController = async (req,res) => {
    
        try{
            const {name} = req.body;
            const {id} = req.params 
            const category = await categoryModel.findByIdAndUpdate( id, {name,slug: slugify(name)},{new : true})
            res.status(200).send({ 
                success: true,
                message: 'Category updated successfully',
                category,
            })
        }catch(err){
            res.status(500).send({
                success: false,
                message: "Failed",
                err
            })
        }
}
export const getCategoryController = async (req, res) => {
    try{
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "all categories list",
            category
        })
    }catch(err){
        res.status(500).send({
            success: false,
            message: "Failed",
            err
        })
    }

}

export const singleCategoryController = async ( req,res ) => {
    try{
        const { id} = req.params
        const category = await categoryModel.findOne({id})
        res.status(200).send({
            message: " get single category success",
            success: true,
            category,
        })
        }catch(err){
        res.status(500).send({
            success: false,
            err,
            message: "Failed"
        })

    }
}
export const deleteCategoryController= async ( req, res ) => {
    try{
        const {id}  = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch(err) {
        res.status(500).send({
            success: false,
            err,
            message: "Failed"
        })
    }
}