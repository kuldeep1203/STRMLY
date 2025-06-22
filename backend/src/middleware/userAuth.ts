import { signup,signin } from "../Utils/types";
import { Request, Response, NextFunction } from "express";
import logger from "../Utils/logger";
import { verifyToken } from "../Utils/common";




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
export function userValidation(req: Request, res: Response, next: NextFunction) { 
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]||null;
    if (!token) {
        logger.warn("No token provided");
        res.status(401).json({ message: "Unauthorized attempt" });
    }
    try{
        const decoded = verifyToken(token) ;
        req.userId = (decoded as { userId: string }).userId; // Set userId in request for further use
        logger.info("User validation successful:", decoded);
        next();
    }catch (error) {
        logger.error("User validation error:", error);
        res.status(401).json({ message: "Unauthorized", error });
    }
 }