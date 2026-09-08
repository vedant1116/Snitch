import mongoose from "mongoose"
import { config } from "./config.js"
export function connetToDb(){
    
    mongoose.connect(config.MONGO_URI).then(()=>{
        console.log("Connected to Db Successfully")
    })
}
