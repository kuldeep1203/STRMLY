import { signup,signin } from "../Utils/types";
import { Request, Response, NextFunction } from "express";
import logger from "../Utils/logger";



export function validateSignup(req:Request, res:Response, next:NextFunction)  {
    try{
        signup.parse(req.body);
        logger.info("Signup data validated successfully");
        next();
    }catch (error) {
        logger.error("Validation error:", error);
        res.status(400).json({ message: "Invalid request data", error });
    }
}
export function validateSignin(req:Request, res:Response, next:NextFunction)  {
    try{
        logger.info(JSON.stringify(req.body));
        signin.parse(req.body);
        logger.info("Signin data validated successfully");
        next();
    }catch (error) {
        logger.error("Validation error:", error);
        res.status(400).json({ message: "Invalid request data", error });
    }
}