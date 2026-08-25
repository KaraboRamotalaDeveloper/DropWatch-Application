const { decodeToken } = require("../utils/util.js");
require("dotenv").config();

const authenticateRoute = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Invalid token" });

  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // const token = generateToken({
  //   userId: user._id,
  //   username: user.username,
  //   email: user.email,
  //   role: user.role,
  //   joined: user.createdAt,

  req.user = decoded;

  console.log(req.user);
  console.log(decoded);

  next();
};

module.exports = authenticateRoute;
