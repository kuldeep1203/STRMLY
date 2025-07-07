import { Router} from "express";
import  { signupController,signinController,profileController,getVideoController,logoutController,uploadController,getUserVideoController,deleteVideoController} from "../controllers/userController"
import { validateSignup,validateSignin,userValidation } from "../middleware/userAuth"
import { upload } from "../middleware/multer";
const router = Router();


router.post("/signup",validateSignup,signupController);
router.post("/signin", validateSignin,signinController);
router.get("/profile",userValidation,profileController); 
router.get("/logout",userValidation,logoutController); 
router.post("/upload",userValidation,upload.single("video"),uploadController); 
router.get("/fetchData",userValidation,getVideoController)
router.get("/fetchUserVideos",userValidation,getUserVideoController)
router.delete("/deleteVideo/:id",userValidation,deleteVideoController)
export default router;

