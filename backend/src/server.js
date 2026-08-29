const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//modules
const connectDB = require("./db.js");
const authRoutes = require("./routes/authRoutes.js");
const reportRoutes = require("./routes/reportRoutes.js");
const workerReportRoute = require("./routes/workerReportRouter.js");
const adminReportRoute = require("./routes/adminReportRoutes.js");

//miudllewares
const {
  authenticateRoute,
  authorizeAdminAccess,
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
app.use("/api/v1/reports/", authenticateRoute, reportRoutes);
app.use(
  "/api/v1/reports/authorize?role=admin",
  authenticateRoute,
  authorizeAdminAccess,
  adminRoutes,
);

//app-variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
