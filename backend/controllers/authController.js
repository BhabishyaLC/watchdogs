import User from "../models/usersAuth.js";
import bcrypt from "bcrypt";
import { requireAuth, generateToken } from "../middlewares/jwt.js";
import dotenv from "dotenv";

dotenv.config();
const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!!" });
    }
    const payload = {
      id: user._id,
      role: user.role,
      name: user.name,
      userName: user.userName,
    };

    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login Successful:)",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        userName: user.userName,
        profileImage: user.profileImage
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const authRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "resident",
    });

    const savedUser = await user.save();

    const payload = {
      id: savedUser._id,
      role: savedUser.role,
      name: savedUser.name,
    };

    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        role: savedUser.role,
        userName: savedUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const authLogOut = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.setHeader("Clear-Site-Data", "cookie");

    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const { userName } = req.body;

    const user = await User.findById(id);

    if (userName) {
      user.userName = userName;
    }
    if (req.file) {
      console.log("File received by Multer:", req.file);

      user.profileImage = req.file.path;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      updatedUser: updatedUser,
    });

    console.log(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!!" });
  }
};

const savedReport = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "USer is not found!" });
    }

    const saved = user.savedBy.includes(id);

    if(saved){
      user.savedBy.pull(id)
      await user.save()
      return res.status(200).json({ message: "Report removed from saved feed", saved: false });
    }else{
      user.savedBy.push(id)
      await user.save()
      return res.status(200).json({ message: "Report saved successfully", saved: true });
    }

  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during confirmation!" });
  }
};

const getSavedReport=async(req,res)=>{
  try {
    const userId=req.user.id
    
   const user = await User.findById(req.user.id)
      .populate({
        path: 'savedBy', 
        options: { sort: { createdAt: -1 } }, 
        
        populate: {
          path: 'createdBy', 
          select: 'name userName profileImage avatar' 
        }
      });

    res.status(200).json({savedReport: user.savedBy})
  } catch (error) {
    res.status(500).json({ message: "Error compiling saved reports profile data" });
  }
}

export { authLogin, authRegister, authLogOut, updateProfile,savedReport, getSavedReport };
