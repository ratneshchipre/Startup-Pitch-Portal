import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

const setUserToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    secret,
    { expiresIn: "24h" }
  );
};

const getUserToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { setUserToken, getUserToken };
