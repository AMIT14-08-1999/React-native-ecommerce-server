import express from "express";
import {forgetpassword, getMyProfile, login, logOut, registration, resetpassword, updatePassword, updatePic, updateProfile} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router=express.Router();
router.post("/login",login);
router.post("/new",singleUpload,registration);
router.get("/me",isAuthenticated,getMyProfile);
router.get("/logOut",isAuthenticated,logOut);

//Updating Routes
router.put("/updateprofile",isAuthenticated,updateProfile);
router.put("/chagepassword",isAuthenticated,updatePassword);
router.put("/updatepic",isAuthenticated,singleUpload, updatePic);

//Forget Password & Reset Password
router.route("/forgetpassword").post(forgetpassword).put(resetpassword);


export default router;


