import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  if (req.user._id !== req.params.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.passqord, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          picture: req.body.picture,
        }
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user._id!== req.params.id) {
    return res.status(401).json({ message: "Unauthorized" });
  };
  
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error)
  }
};