import express from 'express';
import { categoryController } from '../controllers/categoryController.js';
import { updateCategoryController } from '../controllers/categoryController.js';
import {getCategoryController} from '../controllers/categoryController.js';
import { singleCategoryController } from '../controllers/categoryController.js';
import { deleteCategoryController } from '../controllers/categoryController.js';
const router= express.Router();

router.post("/create-category", categoryController);
router.put("/update-category/:id", updateCategoryController);
router.get("/get-category",getCategoryController);
router.get("/single-category/:slug",singleCategoryController);
router.delete("/delete-category/:id",deleteCategoryController);

export default router