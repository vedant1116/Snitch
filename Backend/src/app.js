import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import authRouter from "./routs/auth.route.js";
import cors from "cors";


export const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: [ "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS" ],
    credentials: true
}))



app.use("/api/auth",authRouter);





