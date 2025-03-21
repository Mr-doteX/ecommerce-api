import {expressjwt} from "express-jwt";
import { userModel } from "../models/user.js";



// export const isAuthenticated = expressjwt({})

export const isAuthorized = (roles) =>{
    return async(req, res, next) =>{
        // find user by id
        const user = await userModel.findById(req.auth.id);
        // check if roles is includes role
        if (roles?.includes(user.role)) {
            next();
        }else{
            res.status(403).json('you are not authorized');
        }
    }
}