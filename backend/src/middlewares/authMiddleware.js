const { decodeToken } = require("../utils/util.js");
require("dotenv").config();

const authN = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Invalid token" });

  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decoded;

  console.log("Decoded user:", req.user);

  next();
};

const authZ = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      return res
        .status(403)
        .json({ message: "Not authorized to perform this action" });
    }

    next();
  };
};

module.exports = { authN, authZ };
