const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      //   required: true,
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
    role: {
      type: String,
      enum: ["CITIZIEN", "ADMIN", "WORKER"],
      default: "CITIZIEN",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  //   console.log(!this.isModified("password"));
  //   console.log(this.isModified("password"));
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
