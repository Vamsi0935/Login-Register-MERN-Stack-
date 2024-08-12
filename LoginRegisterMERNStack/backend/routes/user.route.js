import express from "express";
import { register, login } from "../controller/user.controller.js";

const router = express.Router();

// Ensure that these routes are correctly defined and expected methods are used
router.post("/register", register);
router.post("/login", login); 

export default router;
  