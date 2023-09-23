import express from "express";
import * as userController from "../controller/user.controller.js";

const router = express.Router();

router.get("/profile/:id", userController.getProfile);

router.post("/comment", userController.postComment);

export default router;
