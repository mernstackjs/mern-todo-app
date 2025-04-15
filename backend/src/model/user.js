import { model, Schema } from "mongoose";
import argon from "argon2";
const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await argon.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!this.password) {
    throw new Error("No password stored for this user");
  }

  return await argon.verify(this.password, password);
};

const User = model("User", userSchema);

export default User;
