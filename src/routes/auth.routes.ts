import { Request, Response, Router } from "express";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = Router();

// Health Check
router.get("/health-check", (req: Request, res: Response) => {
  console.log("Server is running");
  res.send("Server is running");
});

export default router;
