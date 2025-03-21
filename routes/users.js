import { Router } from "express";
import { loginUser, registerUser, updateUser } from "../controllers/users.js";

// create user router
const userRouter = Router();

// define routes
userRouter.post('/users/register', registerUser);

userRouter.post('/users/login', loginUser);

userRouter.patch('/users/:id', updateUser);

export default userRouter