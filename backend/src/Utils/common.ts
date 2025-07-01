import { JWT_SECRET } from "./config";
import { AWS_ACCESS_KEY_ID ,AWS_REGION,AWS_SECRET_ACCESS_KEY} from "./config";   
import jwt from "jsonwebtoken";
import AWS from "aws-sdk";
import logger from "./logger";
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

export const getPresignedUrl = async (key:string) => {
    logger.info(`key:${key}`)
    key = new URL(key).pathname.slice(1)
    logger.info(`key:${key}`)
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Expires: 60 * 60, // 5 minutes
    };

    return s3.getSignedUrl('getObject', params);
  };  