const express = require("express");
const cors = require("cors");

//modules
const connectDB = require("./db.js");
//run the env
require("dotenv").config();

//instantiate the server app
const app = express();
connectDB();
//middlewares
app.use(express.json());
app.use(cors());

//routes

//app-variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
