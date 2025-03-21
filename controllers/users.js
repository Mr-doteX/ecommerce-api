import { userModel } from "../models/user.js";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validators/users.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const registerUser = async(req, res, next) =>{
    // validate user information
    const {error, value} = registerUserValidator.validate(req.body);
    if(error){
        return res.status(422).json(error);
    }
    // check if user dose not exist already
    const user = await userModel.findOne({
        $or:[
            {username: value.username},
            {email: value.email},
        ]
    });
    if(user){
        return res.status(409).json('user already exist!');
    }
    // Hash plaintex password
    const hashedPassword = bcrypt.hashSync(value.password, 10)
    // Create user records in database
    const results = await userModel.create({
        ...value,
        password: hashedPassword
    });
    // Send registration email to user
    // (optionally) Generate access token for user
    // Return Response
    res.status(201).json('User registered successfully!');

}


export const loginUser = async(req, res, next) =>{
    // validate user information
    const {error , value } = loginUserValidator.validate(req.body)
    if (error){
        return res.status(409).json(error)
    }
    // find matching user record in database
    const user = await userModel.findOne({
        $or:[
            {username: value.username},
            {email:value.email}
        ]
    });
    if(!user){
        return res.status(404).json('User does not exist!');
    }
    // compare incoming password with saved password
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if(!correctPassword){
        return res.status(401).json('invalid credentials')
    }
    // generate access token for user
    const accessToken = Jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'}
    )
    // return response
    res.status(200).json({accessToken});
}


export const updateUser =async(req, res, next) => {
    // validate the user body
    const {error,value} = updateUserValidator.validate(req.body);
    if(error){
        return res.status(422).json(error)
    }
    // update user in database
    const results = await userModel.findByIdAndUpdate(
        req.params.id, //a suaperadmin to update user role
        value
        {new: true}
    );
    // return response
    res.status(200).json(result);
}