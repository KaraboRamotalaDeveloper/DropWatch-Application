const User = require("../models/User.js");
const { generateToken, decodeToken } = require("../utils/util.js");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exits" });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  user.save();

  if (user) {
    return res.status(201).json({ message: "Successfully registered.", user });
  }
  return res.status(500).json({ message: "Something went wrong" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
      const token = generateToken({
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        joined: user.createdAt,
      });

      if (token) {
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }
      return res.status(200).json({
        message: "Login Successful",
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } else {
      return res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    return res
      .status(500)
      .json(`{ message: "Internal server error" , error:${err}}`);
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    htttpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Successfully logged out" });
};

module.exports = { register, login, logout };
