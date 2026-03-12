/**
 * User routes
 * Routes for user-related endpoints (current user retrieval).
 */
import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controllers/user.controller.js";


const userRouter = express.Router();

userRouter.get('/currentUser',isAuth,getCurrentUser)

export default userRouter;
