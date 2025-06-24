import { JWT_SECRET } from "./config";
import { AWS_ACCESS_KEY_ID ,AWS_REGION,AWS_SECRET_ACCESS_KEY} from "./config";   
import jwt from "jsonwebtoken";
import AWS from "aws-sdk";
export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
}
export function verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, JWT_SECRET);
}

export const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

