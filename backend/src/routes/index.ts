import express from "express";
import userRouter from './user';
import { Router  } from "express";
//express.json();
const  router = Router();
router.use("/user",userRouter);
export default router;