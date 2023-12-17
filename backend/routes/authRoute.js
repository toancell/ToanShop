import express from 'express';
import formidable from 'express-formidable';
import { registerController,loginController , photoUser, getAllUsers} from '../controllers/authController.js';

const router = express.Router();

//routing register
router.post('/register', formidable(), registerController);

// routing login
router.post('/login', loginController);
// user
router.get('/user/:pid', photoUser)
// get all users 
router.get('/all-user', getAllUsers)
export default router
