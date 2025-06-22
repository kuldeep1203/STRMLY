import { Router} from "express";
import  { signupController} from "../controllers/userController"
const router = Router();


router.post("/signup", signupController);
//router.post("/login", loginController);


export default router;

//router.post("/signup", signupController);
//router.post("/login", loginController); 