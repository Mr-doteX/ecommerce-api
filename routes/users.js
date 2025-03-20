import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.js";

// create user router
const userRouter = Router();

// define routes
userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser);

export default userRouter