import { hashPasswordfun } from "../utils/bcrypt.js";
import { emailRegex, indianNumberRegex, nameRegex, passwordRegex } from "../utils/validation.js";
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
export const signUp= async(req,res)=>{
    try {
        const reqdata= req.body;
        const {full_name, email,password,mobile}= reqdata;
//validation -------------------------------------------------------------
 if(!full_name || !email|| !password || !mobile){
    return res.status(400).json({message:"Please fill all requried filed"});
 }
if(!nameRegex.test(full_name)) return res.status(400).json({"error": "Bad Request",
"message": "Invalid name format. Please provide a valid name."})

if(!emailRegex.test(email)) return res.status(400).json({"error": "Bad Request",
"message": "Invalid email format. Please provide a valid email."})

if(!indianNumberRegex.test(mobile)){
    return res.status(400).json({"error": "Bad Request",
"message": "Invalid name format. Please provide a valid mobile number."})
};
if(!passwordRegex.test(password)){
    return res.status(400).json({"error": "Bad Request",
    "message": "Invalid password format. Please provide a valid password."})
}

// bcrypt
 reqdata.password= await hashPasswordfun(password);
console.log(password)
 // check in database mobile or email is unique or not
 
 const checkData = await User.findOne({$or: [{ email }, { mobile }] });
if(checkData) return res.status(400).json({"error": "Bad Request",
"message": "email or mobile already exits in database."});

const createdata= await User.create(reqdata);
if(createdata){
    return res.status(201).json({message:"signup sucessfully ", data:createdata});
}else{
    return res.status(400).json({error:"can't able to log in", message:"please try again"});
}


    } catch (error) {
        console.log(error )
        res.status(500).json({message:error.message});
    }
};


export const login= async(req,res)=>{
    try {
        let reqdata=req.body;
const {email,password}=reqdata;
//validation -------------------------------------------------------------
if( !email|| !password ){
    return res.status(400).json({message:"Please fill all requried filed"});
 }

//-------------------------------------------------------
if(!emailRegex.test(email)) return res.status(400).json({"error": "Bad Request",
"message": "Invalid email format. Please provide a valid email."})

if(!passwordRegex.test(password)){
    return res.status(400).json({"error": "Bad Request",
    "message": "Invalid password format. Please provide a valid password."})
}

const finduser= await User.findOne({email});
if (!finduser) {
    return res.status(400).json({ status: false, message: "invalid email" });
  }
  // compare password--------------------------------------------------------------------------------

  bcrypt.compare(password, finduser.password, function (err, passwordMatch) {
    if (err || !passwordMatch) {
      return res.status(400).json({ status: false, message: 'Passwords do not match' });
    }
   const {JWT_SECRET,JWT_EXPIRY}= process.env;
    const token = jwt.sign({ id: finduser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRY,
    });

    res.setHeader('x-api-key', token);
    return res.status(200).json({ status: true, data: { token: token } });
    
  })

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}