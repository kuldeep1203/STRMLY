import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import helmet  from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

const allowedOrigins = ['http://localhost:5173', 'https://your-production-domain.com'];

declare module "express" {
    export interface Request {
        userId?: string;
    }
}
dotenv.config()
const app  = express();
const PORT = process.env.PORT;
import router from "./routes/index"



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(helmet());
app.use(rateLimit({windowMs:15*60*1000,max:100}));
app.use("/api/v1",router);

app.listen(PORT,()=>{
    console.log("works");
})

export default app;