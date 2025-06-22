import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
}
export function verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, JWT_SECRET);
}