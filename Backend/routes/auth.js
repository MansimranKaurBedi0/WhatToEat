import { login,signup,getprofile } from "../controller/auth.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
import express from "express";
const router=express.Router();
router.post('/login',login);
router.post('/signup',signup);
router.get('/profile',authMiddleware,getprofile);
export default router;