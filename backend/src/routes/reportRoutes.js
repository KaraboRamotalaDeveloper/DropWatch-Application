const express = require("express");
// require("dotenv").config();
const router = express.Router();
require("dotenv").config();

//middlewares
const upload = require("../middlewares/upload.js");
const { authZ } = require("../middlewares/auth.js");

//controllers
const {
  fetchReports,
  fetchReportsByFilter,
  logReport,
  fetchReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportHandlers.js");

//admin
// - create report
router.post(
  "/logreport",
  (req, res, next) => {
    console.log("🔥 /logreport route reached");
    next();
  },
  upload.single("img"),
  (req, res, next) => {
    console.log("🔥 Multer finished");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    next();
  },
  logReport,
); // - get all reports
router.get("/fetchreports/filtered", fetchReportsByFilter);
router.get("/fetchreports/:reportId", fetchReportById);
router.get("/fetchreports", fetchReports);
router.patch("/updatereport/:reportId", updateReport);
router.delete("/delreport/:reportId", deleteReport);

module.exports = router;
