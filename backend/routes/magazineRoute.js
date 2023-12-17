import express from 'express';
import formidable from 'express-formidable'
import { getMagazinePostController, getPhotoMagazine, getSingleMagazinePost, magazineCreatePostController } from '../controllers/magazineController.js';
const router= express.Router(); 
router.post("/create-magazine-post",formidable(), magazineCreatePostController)
router.get("/get-magazine-post",getMagazinePostController)
router.get("/:slug", getSingleMagazinePost)
router.get("/photo/:mid", getPhotoMagazine)
export default router