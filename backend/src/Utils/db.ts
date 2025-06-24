import mongoose from "mongoose";
import { Path } from "./config"
import logger from "../Utils/logger";

mongoose.connect(Path).then(() => {
   logger.info("Connected to MongoDB");
  console.log("Connected to MongoDB");
}).catch((error) => {
  logger.error("Error connecting to MongoDB:", error);
  throw new Error("Failed to connect to MongoDB");
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
})


const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    s3Url:String,
    uploadedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
export const Video = mongoose.model("Video", videoSchema);  