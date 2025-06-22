import { Router} from "express";
import  { signupController,signinController,profileController} from "../controllers/userController"
import { validateSignup,validateSignin,userValidation } from "../middleware/userAuth"
const router = Router();


router.post("/signup",validateSignup,signupController);
router.post("/signin", validateSignin,signinController);
router.get("/profile",userValidation,profileController); // Assuming you have a profileController for fetching user profile

export default router;

//router.post("/signup", signupController);
//router.post("/login", loginController); 