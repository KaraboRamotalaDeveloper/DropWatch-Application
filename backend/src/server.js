const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//modules
const connectDB = require("./db.js");
//routes
const authRoutes = require("./routes/authRoutes.js");
// const citizienReportRoutes = require("./routes/citizienReportRoutes.js");
// const adminReportRoutes = require("./routes/adminReportRoutes.js");
// const workerReportRoutes = require("./routes/workerReportRoutes.js");

const reportRoutes = require("./routes/reportRoutes.js");
//middlewares
const { authN, authZ } = require("./middlewares/authMiddleware.js");

//run the env
require("dotenv").config();

//instantiate the server app
const app = express();
connectDB();

//app settings
app.set("query parser", "extended");
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api/v1/auth/", authRoutes); //login,register,logout

// app.use("/api/v1/reports/", authN, citizienReportRoutes);
// app.use("/api/v1/worker", authN, authZ, workerReportRoutes);
// app.use("/api/v1/admin", authN, authZ, adminReportRoutes);
app.use(
  "/api/v1/reports/",
  authN,
  authZ("ADMIN", "WORKER", "CITIZIEN"),
  reportRoutes,
);
//app-variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
