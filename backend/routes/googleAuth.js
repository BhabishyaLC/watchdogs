import express, { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = express.Router();

dotenv.config();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),

  (req, res) => {
    try {
      const userInfo = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        avatar: req.user.avatar,
        userName:req.user.userName
      };
      const token = jwt.sign({ userInfo }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    } catch (error) {
      console.log("Google login error", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
    }
  },
);

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

   
    res.setHeader("Clear-Site-Data", "cookie");

    res.status(200).json({ success: true, message: "Logged out" });
    
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
});

export default router;
