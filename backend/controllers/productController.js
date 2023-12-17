import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
export const productController = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
    } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name required" });
      case !price:
        return res.status(500).send({ message: "Price required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity" });
      case !description:
        return res.status(500).send({ message: "Description required" });
      case !category:
        return res.status(500).send({ message: "Category required" });
      
    }
    const product = new productModel({
      name,
      description,
      price,
      category,
      shipping : "shipping",
      quantity,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      message: "Product saved successfully",
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed",
      err,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await productModel.find({ }).populate('category').select("-photo").sort({createAt: -1});
    res.status(200).send({
      success: true,
      countTotal: product.length,
      message: "Product successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed",
      success: false,
      err,
    });
  }
};
// get new arrival
export const getNewArrival = async (req, res) => {
  try{
    const product = await productModel.find({}).populate('category').select("-photo").limit(5)
    res.status(200).send({
      success: true,
      message: "Product successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed",
      success: false,
      err,
    });
  }
}

// get infor single product
export const getSingleProductController = async( req,res) =>{
  try{
    const product = await productModel.findOne({slug: req.params.slug}).select("-photo").populate("category")
    res.status(200).send({
      success: true,
      message: 'get single product successfully',
      product
    })
  }
  catch(err){
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed",
      err
    })
  }
}
// get photo
export const  productPhotoController = async (req,res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo")
    if(product.photo.data){
      res.set('Content-type', product.photo.contentType)
      return res.status(200).send(product.photo.data)
    }
  }catch(err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "Failed",
      err
    })
  }
}

// delete product
export const deleteProductController = async (req,res) => {
  try{
    await productModel.deleteById(req.params.pid).select("-photo")
    res.status(200).send({
      success: true,
      message: "Product deleted successfully"
    })
  }catch(err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "Failed",
      err
    })
  }
}

//update product
export const updateProductController = async (req,res) => {
  try{
    const {
      name,
      slug,
      description,
      price,
      category,
      quantity,
      shipping,
    } = req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ message: "Name required" });
      case !price:
        return res.status(500).send({ message: "Price required" });
      case !quantity:
        return res.status(500).send({ message: "Quantity" });
      
      case !description:
        return res.status(500).send({ message: "Description required" });
      case !category:
        return res.status(500).send({ message: "Category required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ message: "Photo is required and should be less than 1mb" });
    }
    const product = await productModel.findByIdAndUpdate(req.params.id, {...req.fields, slug: slugify(name)}, {new: true})
    if(photo){
      product.photo.data= fs.readFileSync(photo.path)
      product.photo.contentType= photo.type
    }
  }catch(err) {
    console.log(err)
    res.status(500).send({
      success: false,
      message: "Failed",
      err
    })
  }
}
//filter
export const productFilterControllers = async (req, res) => {
  try {
    const { valueCategory,selected } = req.body;
    let products = [];

    if(selected === "high-to-low"){
      products = await productModel.find({valueCategory}).sort({ price: -1 }); 
    } 
    if( selected === "low-to-high"){
      products = await productModel.find({valueCategory}).sort({price:1});
    }  
    if( selected === "a-to-z"){
      products = await productModel.find({valueCategory}).sort({name: -1});
    } 
    if( selected === "z-to-a"){
      products = await productModel.find({valueCategory}).sort({name: 1});
    }
    
    res.status(200).send({
      success: true,
      message: "Ok",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed",
    });
  }
};

export const searchProductController = async (req,res) => {
  try{
    const {keyword} = req.params;
    const result = await productModel.find({
      $or: [{name : {$regex  : keyword , $options : "i"}},
      {description : {$regex : keyword , $options : "i"}}
    ]
    }).select("-photo")
  }catch(err){
    res.status(500).send({
      message: "Failed",
      success: false,
      err
    })
  }
}

export const relatedProductController = async (req, res) => {
  try{
    const {pid,cid} = req.params
    const products = await productModel.find({
      category: cid,
      _id: { $ne: pid },
    }).select("-photo").limit(3).populate("category")
  }catch(err){
    res.status(500).send({
      success: false,
      message: "Failed",
      err
    })
  }
}