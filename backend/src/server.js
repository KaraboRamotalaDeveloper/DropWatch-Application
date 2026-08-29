const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//modules
const connectDB = require("./db.js");
const authRoutes = require("./routes/authRoutes.js");
const citizienReportRoutes = require("./routes/citizienReportRoutes.js");
const adminReportRoutes = require("./routes/adminReportRoutes.js");

//miudllewares
const {
  authenticateRoute,
  authorizeAccess,
} = require("./middlewares/authMiddleware.js");

//run the env
require("dotenv").config();

//instantiate the server app
const app = express();
connectDB();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/reports/", authenticateRoute, citizienReportRoutes);
app.use(
  "/api/v1/reports/authorize",
  authenticateRoute,
  authorizeAccess,
  adminReportRoutes,
);

//app-variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
