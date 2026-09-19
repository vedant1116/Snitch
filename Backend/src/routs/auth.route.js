import{Router} from "express"
import { validateRegisteration, validateLogin } from "../validation/auth.validation.js";
import { register, login } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post('/register', validateRegisteration, register);
authRouter.post('/login', validateLogin, login);

export default authRouter

