import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare the entered password with the stored password for a user.
 * @param {string} enteredPassword - The password entered by the user.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if the passwords match, and false otherwise.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the entered password with the stored password using bcrypt.compare
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
