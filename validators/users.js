import joi from "joi";

export const registerUserValidator = joi.object({
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password'),
}).with('password', 'confirmedPassword');

export const loginUserValidator = joi.object({
    username: joi.string().optional(),
    email: joi.string().optional(),
    password: joi.string().required(),
});