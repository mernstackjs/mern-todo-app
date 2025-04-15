import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const authentication = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(403).json({
      message: "dont have access token",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sid);
    if (!user)
      return res.status(404).json({
        status: "faild",
        message: "dont found any user",
      });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
