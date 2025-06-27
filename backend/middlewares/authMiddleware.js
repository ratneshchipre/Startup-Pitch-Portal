import { getUserToken } from "../config/auth.js";

const checkForAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No auth token, access denied",
      });
    }

    const user = getUserToken(token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid or expired token, authorization denied. Please login again",
      });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };
    req.token = token;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication failed. Please login again",
      details: error.message,
    });
  }
};

export default checkForAuth;
