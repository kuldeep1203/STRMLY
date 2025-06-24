import { Router} from "express";
import  { signupController,signinController,profileController,logoutController,uploadController} from "../controllers/userController"
import { validateSignup,validateSignin,userValidation } from "../middleware/userAuth"
const router = Router();


router.post("/signup",validateSignup,signupController);
router.post("/signin", validateSignin,signinController);
router.get("/profile",userValidation,profileController); 
router.get("/logout",userValidation,logoutController); 
router.post("/upload",userValidation,uploadController); 
export default router;

