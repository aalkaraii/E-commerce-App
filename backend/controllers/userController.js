import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: " User doesn't exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
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
    if (!validator.isEmail) {
      return res.json({
        success: false,
        message: " Please enter a valid Email ",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: " Please enter Strong password",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for Admin login
const adminLogin = async (req, res) => {
  try {
    console.log("Admin Login Request:", req.body, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
    const { email, password } = req.body;

    // Check if admin is in DB
    const admin = await adminModel.findOne({ email }).select('+password');
    console.log("Admin:", admin);
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = jwt.sign(
          { id: admin._id, email: admin.email, role: "admin" },
          process.env.JWT_SECRECT
        );
        return res.json({ success: true, token });
      } else {
        return res.json({ success: false, message: "Invalid credentials" });
      }
    }

    // Fallback to process.env and auto-migrate to DB
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      console.log('here')
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newAdmin = new adminModel({
        email,
        password: hashedPassword
      });
      admin = await newAdmin.save();

      const token = jwt.sign(
        { id: admin._id, email: admin.email, role: "admin" },
        process.env.JWT_SECRECT
      );
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for Admin Change Password
const adminChangePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Fallback if legacy token was used and email isn't in token payload
    const email = req.admin ? req.admin.email : process.env.ADMIN_EMAIL;

    let admin = await adminModel.findOne({ email });
    if (!admin) {
      // Auto-migrate if admin is not in DB yet
      if (email === process.env.ADMIN_EMAIL) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
        admin = new adminModel({
          email,
          password: hashedPassword
        });
        await admin.save();
      } else {
        return res.json({ success: false, message: "Admin account not found" });
      }
    }

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect current password" });
    }

    if (newPassword.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    return res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for Admin Forgot Password
const adminForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Admin email not found" });
    }

    let admin = await adminModel.findOne({ email });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      admin = new adminModel({
        email,
        password: hashedPassword
      });
      await admin.save();
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await admin.save();

    const adminFrontendUrl = process.env.ADMIN_FRONTEND_URL || "http://localhost:5174";
    const resetLink = `${adminFrontendUrl}/reset-password?token=${resetToken}&email=${email}`;

    const mailOptions = {
      to: email,
      subject: "Admin Password Reset Request",
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for the admin account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `${resetLink}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      html: `
        <div style="font-family: 'Outfit', sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #c586a5; font-size: 24px; font-weight: bold; margin-bottom: 16px;">Admin Password Reset</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #4b5563;">You requested a password reset for the admin panel.</p>
          <p style="font-size: 16px; line-height: 1.5; color: #4b5563;">Please click the button below to set a new password. This link is valid for 1 hour.</p>
          <div style="margin: 24px 0;">
            <a href="${resetLink}" style="background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 15px;">Reset Password</a>
          </div>
          <p style="font-size: 14px; color: #6b7280;">Or copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; font-size: 14px; color: #4b5563; background-color: #f3f4f6; padding: 12px; border-radius: 6px; font-family: monospace;">${resetLink}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">If you did not request this reset, please ignore this email.</p>
        </div>
      `
    };

    const emailResult = await sendEmail(mailOptions);

    return res.json({
      success: true,
      message: emailResult.loggedToConsole
        ? "Reset link generated (logged to server console for development)"
        : "Reset password email sent successfully"
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for Admin Reset Password
const adminResetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    const admin = await adminModel.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return res.json({ success: false, message: "Password reset token is invalid or has expired" });
    }

    if (newPassword.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (min 8 characters)" });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    admin.resetPasswordToken = null;
    admin.resetPasswordExpires = null;
    await admin.save();

    return res.json({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin, adminChangePassword, adminForgotPassword, adminResetPassword };
