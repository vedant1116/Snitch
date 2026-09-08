import {app} from "./src/app.js"
import { connetToDb } from "./src/config/db.js";

app.listen(3000,()=>{
    console.log("Server started running on port 3000");
})
connetToDb();
