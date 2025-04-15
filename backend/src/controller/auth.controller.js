import User from "../model/user.js";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email | !username | !password)
      return res.status(404).json({
        status: "faild",
        message: "fill all fields",
      });
    const userIsFound = await User.findOne({ email });
    if (userIsFound)
      return res.status(404).json({
        status: "faild",
        message: "found already this user",
      });

    const newUser = new User({
      email,
      username,
      password,
    });

    await newUser.save();
    res.status(201).json({
      status: "success",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "faild",
      message: "server error",
      error: error.message,
    });
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email | !password)
      return res.status(404).json({
        status: "faild",
        message: "fill all fields",
      });
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({
        status: "faild",
        message: "dont found this user",
      });

    const isMatched = await user.comparePassword(password);
    if (!isMatched)
      return res.json({
        status: "faild",
        message: "Invalid error",
      });
    const token = jwt.sign({ sid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(201).json({
      status: "success",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "faild",
      message: "server error",
      error: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "faild",
      message: "Logout failed",
      error: error.message,
    });
  }
};
