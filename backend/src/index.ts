import express from "express";
import cors from 'cors';
import helmet  from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";


dotenv.config()
const app  = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({windowMs:15*60*1000,max:100}));

app.listen(PORT,()=>{
    console.log("works");
})

export default app;