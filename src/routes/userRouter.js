import { getProfileDetails, login, signUp } from "../controllers/userController.js";
import express from "express";

const router= express.Router();
router.get('/get', function(req,res){
    res.status(200).json({msg:"sucess full"})
})
router.post('/signup',signUp )
router.post('/login',login);
router.get('/getuser', getProfileDetails)
export default router;