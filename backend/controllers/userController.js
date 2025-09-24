import validator from "validator";
import userModel from "../models/userModel.js";
// Route for user login
const loginUser = async (req, res) => {
  res.json({ msg: "Login API working" });
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking user already exists or not
    const esixts = await userModel.findOne({ email });
    if (esixts) {
      return res.json({ success: false, message: " User already exists" });
    }
    // validation email format an d strong password
    if (condition) {
    }
  } catch (error) {}
};

// Route for Admin login
const adminLogin = async (req, res) => {
  res.json({ msg: "Admin Login API working" });
};

export { loginUser, registerUser, adminLogin };
