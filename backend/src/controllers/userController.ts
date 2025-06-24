import { Request,Response } from "express";
import { generateToken , s3} from "../Utils/common";
import bcrypt from "bcryptjs";
import { User , Video } from "../Utils/db";
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
    } catch (error: any) {
        if(error.code === 11000) {
            logger.error("User already exists:", username);
            res.status(409).json({ message: "User already exists" });
        }else{
            logger.error("Error creating user:", error);
            res.status(500).json({ message: "Error creating user", error });
        }
        
    }
};

export const signinController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            logger.warn("User not found:", username);
            res.status(404).json({ message: "User not found" });
        }else{
            logger.info(logger.info(`User found: ${user.username}`));
            // Compare the password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                logger.info(`User signed in successfully:,${username}`);
                const token = generateToken(user._id.toString());
                res.cookie("token", token, { httpOnly: true, secure: false });
                res.status(200).json({ message: "User signed in successfully" });
            } else {
                logger.warn(`Invalid password for user:", ${username}`);
                res.status(401).json({ message: "Invalid password" });
            }
        }
    } catch (error) {
        logger.error("Error signing in user:", error);
        res.status(500).json({ message: "Error signing in user", error });
    }
};

export const profileController  = async (req: Request, res: Response) => {
    const userId = req.userId;   
    try {
        const user = await User.findById(userId).select("-password"); //
        if (!user) {
            logger.warn("User not found for profile:", userId);
            res.status(404).json({ message: "User not found" });
        }
        logger.info(`User profile fetched successfully : ${userId}`);
        res.status(200).json({ user });
    } catch (error) {
        logger.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Error fetching user profile", error });
    }
}

export const logoutController = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        logger.info("User logged out successfully");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        logger.error("Error logging out user:", error);
        res.status(500).json({ message: "Error logging out user", error });
    }
};

export const uploadController = async (req: Request, res: Response) => {
    const file  = req.file as Express.Multer.File;
    const userId = req.userId;

    if(!file){
        logger.warn("No file uploaded ");
        res.status(400).json({ message: "No file uploaded" });
    }
    const s3params = {
        Bucket : process.env.AWS_BUCKET_NAME as string,
        Key:`videos/${Date.now()}-${file.originalname}`,
        Body:file.buffer,
        ContentType:file.mimetype,
    }
    try{
        const s3Result =  await s3.upload(s3params).promise();
        logger.info(`File uploaded successfully to S3: ${s3Result.Location}`);

        const newVideo = await Video.create({
            userId,
            title  : file.originalname,
            s3Url: s3Result.Location,
        })
        res.status(201).json({ message: "File uploaded successfully", video: newVideo });
    }catch(error){
        logger.error(`Error uploading file to S3: ${error}`);
        res.status(500).json({ message: "Error uploading file "})
    }
}
;