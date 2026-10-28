import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import authRouter from "./routs/auth.route.js";
import productRouter from "./routs/product.route.js";
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { config } from "./config/config.js";
export const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(passport.initialize())
passport.use(new GoogleStrategy({
    clientID:config.CLIENT_ID,
    clientSecret:config.CLIENT_SECRET,
    callbackURL:"/api/auth/google/callback"
},async (accessToken, refreshToken,profile,done)=>{
    done(null,profile);
}))
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
];

// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     methods: [ "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS" ],
//     credentials: true
// }))



app.use("/api/auth",authRouter);
app.use("/api/products",productRouter);





