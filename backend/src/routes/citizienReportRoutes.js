const express = require("express");
const {
  logReport,
  fetchCitizienReports,
  updateReport,
  deleteReport,
} = require("../controllers/citizienReportHandler.js");

const router = express.Router();

router.post("/logreport", logReport);
router.get("/fetch/reports/citizien", fetchCitizienReports);
router.patch("/update/report/citizien/:reportId", updateReport);
router.delete("/delete/report/citizien/:reportId", deleteReport);

module.exports = router;
