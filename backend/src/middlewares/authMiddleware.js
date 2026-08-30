const { decodeToken } = require("../utils/util.js");
require("dotenv").config();

const authenticateRoute = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Invalid token" });

  const decoded = decodeToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = decoded;
  next();
};

const authorizeAccess = (req, res, next) => {
  const { role } = req.query;

  if (role !== req.user.role.toLowerCase()) {
    return res
      .status(401)
      .json({ message: "Not authorized to perform this action" });
  }

  next();
};

module.exports = { authenticateRoute, authorizeAccess };
