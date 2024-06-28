import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered succesfully",
      user: {
        _id: newUser._id,
        name: newUser.username,
        email: newUser.email
      },
    });
  } catch (error) {
    next(error);
  }
};
