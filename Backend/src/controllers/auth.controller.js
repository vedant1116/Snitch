
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneno: user.phoneno,
            role: user.role
        }
    });
}

export const register = async (req, res) => {
    const { email, password, phoneno, fullname, isSeller } = req.body;
    try {
        const normalizedEmail = email?.toLowerCase().trim();
        const isAlreadyExists = await userModel.findOne({
            $or: [
                { email: normalizedEmail },
                { phoneno }
            ]
        });

        if (isAlreadyExists) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }

        const user = await userModel.create({
            email: normalizedEmail,
            phoneno,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer"
        });

        await sendTokenResponse(user, res, "User Registered Successfully");
    } catch (error) {
        console.error("Register Error:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "User with this email already exists" });
        }
        return res.status(500).json({ message: "Server error" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const normalizedEmail = email?.toLowerCase().trim();
        const user = await userModel.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        await sendTokenResponse(user, res, "User logged in successfully");
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error during login" });
    }
};

export const googleCallback = async (req, res) => {
    const { id , displayName , emails, photos} = req.user;
    const email=emails[0].value;
    const profilePic=photos[0].value;

    let user= await userModel.findOne({
        email:email
    })
    
    if(!user){
        user = await userModel.create({
            email:email,
            googleId:id,
            fullname:displayName,
        
        })
    }
    const token = jwt.sign({
        id:user._id,
    },config.JWT_SECRET,{
        expiresIn:"7d"
    })
    res.cookie("token",token)
    res.redirect("http://localhost:5173/")
}