import jwt from "jsonwebtoken";
const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "not authorize" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRECT);
    
    // Check old format (legacy concatenated string)
    if (token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return next();
    }
    
    // Check new format (object payload with role: "admin")
    if (token_decode && token_decode.role === "admin") {
      req.admin = token_decode; // attach token payload to request
      return next();
    }

    return res.json({ success: false, message: "not authorize" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
export default adminAuth;
