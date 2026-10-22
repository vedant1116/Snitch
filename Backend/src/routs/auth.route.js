import{Router} from "express"
import { validateRegisteration, validateLogin } from "../validation/auth.validation.js";
import { register, login , googleCallback } from "../controllers/auth.controller.js";
import passport from "passport";
const authRouter = Router();

authRouter.post('/register', validateRegisteration, register);
authRouter.post('/login', validateLogin, login);    

authRouter.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',passport.authenticate('google',{session:false}), googleCallback )


export default authRouter

