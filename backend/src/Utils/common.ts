import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
}