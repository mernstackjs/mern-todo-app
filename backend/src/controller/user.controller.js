import User from "../model/user.js";

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({
        status: "faild",
        message: "dont found this user",
      });

    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "faild",
      message: "server error",
      error: error.message,
    });
  }
};
