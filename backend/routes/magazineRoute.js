import express from 'express';
import formidable from 'express-formidable'
import { getMagazinePostController, magazineCreatePostController } from '../controllers/magazineController.js';
const router= express.Router(); 
router.post("/create-magazine-post",formidable(), magazineCreatePostController)
router.get("/get-magazine-post",getMagazinePostController)
export default router