import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";


const userProfileRouter = Router();
const userProfileControler = new ProfileController();

userProfileRouter.use(isAuthenticated);
userProfileRouter.get("/", userProfileControler.show)
userProfileRouter.patch("/", userProfileControler.update)

export default userProfileRouter;
