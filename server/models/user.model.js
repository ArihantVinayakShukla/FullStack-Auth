import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    authMethod: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    picture: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
