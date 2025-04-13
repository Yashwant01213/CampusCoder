import express from 'express';
import { register, login , logout } from "../controllers/authController.mjs";
import authMiddleware from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post("/register", register); // Register Route
router.post("/login", login); // Login Route

router.post("/logout", logout); // Logout Route 

router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user }); // you can return full user details if your JWT includes them
  });


export default router;
