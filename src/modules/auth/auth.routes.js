import { Router } from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { cahngeUserPassword, signin, signup } from "./auth.controller.js";

const authRouter = Router()

authRouter.post('/signup',checkEmail,signup)
authRouter.post('/signin', signin)
authRouter.patch('/changepassword',cahngeUserPassword)
export default authRouter

