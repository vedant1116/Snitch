import{Router} from "express"
import { validateRegisteration } from "../validation/auth.validation.js";
import { register } from "../controllers/auth.controller.js";
const authRouter=Router();

authRouter.post('/register',validateRegisteration,register);


export default authRouter

