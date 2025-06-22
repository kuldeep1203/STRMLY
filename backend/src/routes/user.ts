import { Router} from "express";
import  { signupController,signinController} from "../controllers/userController"
import { validateSignup,validateSignin } from "../middleware/userAuth"
const router = Router();


router.post("/signup",validateSignup,signupController);
router.post("/signin", validateSignin,signinController);


export default router;

//router.post("/signup", signupController);
//router.post("/login", loginController); 