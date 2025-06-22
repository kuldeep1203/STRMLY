import { Request,Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../Utils/db";
import logger from "../Utils/logger";

export const signupController = async (req: Request, res: Response) => {
    logger.info(JSON.stringify(req.body));

    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username:username, password:hashedPassword, email:email });
        await newUser.save();
        logger.info("User created successfully:", username);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        logger.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
};