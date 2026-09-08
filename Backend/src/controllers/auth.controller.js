
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

async function sendTokenResponse(user,res){
    const token=jwt.sign({
        id:user._id,
    },config.JWT_SECRET)

}
export const register = async (req,res)=>{
    const { email,password,phoneno,fullname }= req.body;
    try{
    const isAlreadyExists= await userModel.findOne({
    $or:[
        {email},
        {phoneno}
    ]
    })

    if(isAlreadyExists){
          return res.status(400).json({ message: "User with this email or contact already exists" });
    }

    const user =await userModel.create({
        email,
        phoneno,
        password,
        fullname
    })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }

}


