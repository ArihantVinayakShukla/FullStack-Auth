import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    console.log("inside the signUp method")
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      authMethod: "local",
    });
    console.log(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found!" });

    if (user.authMethod === "google") {
      return res
        .status(400)
        .json({ msg: "Please use Google sign-in for this account" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Wrong credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ user: rest });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { name, email, picture } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      if (user.authMethod === 'local') {
        // Update the user to use Google auth
        user.authMethod = 'google';
        user.picture = picture;
        await user.save();
      }
    } else {
      // Create a new user
      user = new User({
        username: name,
        email,
        picture,
        authMethod: 'google',
      });
      await user.save();
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ user: { _id: user._id, username: user.username, email: user.email, picture: user.picture } });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Error during Google authentication", error: error.message });
  }
};
