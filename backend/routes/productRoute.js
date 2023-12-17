import express from "express";
import formidable from "express-formidable";
import { productController, productFilterControllers } from "../controllers/productController.js";
import { getProductController } from "../controllers/productController.js";
import {getSingleProductController}  from "../controllers/productController.js";
import {productPhotoController} from "../controllers/productController.js";
import { updateProductController, searchProductController, relatedProductController, getNewArrival } from "../controllers/productController.js";
const router = express.Router();

router.post("/create-product", formidable(), productController);
router.get("/get-product", getProductController);
router.get("/new-arrival", getNewArrival);
router.get("/get-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.post("/update-product", formidable(), updateProductController)
router.post("/product-filters", productFilterControllers)
router.get("/search/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", relatedProductController);
export default router;
