import express from "express";
import { registerUser } from "../Controllers/authControllers.js";

const router = express.Router();

router.post("/register-user", registerUser);

export default router;
