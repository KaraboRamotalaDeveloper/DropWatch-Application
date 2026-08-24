const User = require("../models/User.js");
const { generateToken, decodeToken } = require("../utils/util.js");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exits" });
  }

  user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    return res.status(201).json({ message: "Successfully registered.", user });
  }
  return res.status(500).json({ message: "Something went wrong" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const decoded = null;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = User.findOne({ email }, { _id, username, email, role });

  if (user && (await user.matchPassword(password))) {
    const { token } = res.cookies;
    if (token) {
      decoded = decodeToken(token);
    } else {
      const token = generateToken(user);

      if (token) {
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        decoded = decodeToken(token);
      }
    }
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }
    return res.status(200).json({ message: "Login Successful", user });
  }

  return res.status(500).json({ message: "Internal server error" });
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
