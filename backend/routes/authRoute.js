import express from 'express';
import { registerController,loginController } from '../controllers/authController.js';

const router = express.Router();

//routing register
router.post('/register', registerController);
// routing login
router.post('/login', loginController);
export default router
