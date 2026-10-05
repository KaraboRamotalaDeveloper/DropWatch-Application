const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer"); // Import multer for error handling

//modules
const connectDB = require("./db.js");
//routes
const authRoutes = require("./routes/authRoutes.js");
const reportRoutes = require("./routes/reportRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
//middlewares
const { authN, authZ } = require("./middlewares/auth.js");

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
app.use(
  cors({
    origin: "http://localhost:5173", // Exact frontend URL (no trailing slash)
    credentials: true, // Allows cookies/headers to pass
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//routes
app.use("/api/v1/auth/", authRoutes); //login,register,logout
app.use("/api/v1/users/", authN, authZ("ADMIN"), userRoutes);
app.use(
  "/api/v1/reports/",
  authN,
  authZ("ADMIN", "WORKER", "CITIZIEN"),
  reportRoutes,
);
//app-variables
const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }

  next();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
