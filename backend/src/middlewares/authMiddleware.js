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

  console.log(decoded);

  next();
};

const authorizeAdminAccess = (req, res, next) => {
  const { role } = req.query;

  if (role !== req.user.role) {
    return res
      .status(401)
      .json({ message: "Not authorized to perform this action" });
  }

  console.log(`${(req.user.role, role, req.user.role && role)}`);
  next();
};

module.exports = { authenticateRoute, authorizeAdminAcess };
