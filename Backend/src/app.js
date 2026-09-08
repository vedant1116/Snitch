import express from "express"
import morgan from "morgan"
import authRouter from "./routs/auth.route.js";



export const app = express();

app.use(express.json())
app.use(morgan("dev"))


app.use("/api/auth",authRouter);





