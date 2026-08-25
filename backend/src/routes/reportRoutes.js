const express = require("express");
const {
  logReport,
  fetchCitizienReports,
  updateReport,
  deleteReport,
} = require("../controllers/reportHandlers.js");

const router = express.Router();

router.post("/logreport", logReport);
router.get("/fetch/citizien/reports", fetchCitizienReports);
router.patch("/update/citizien/report/:reportId", updateReport);
router.delete("/delete/citizien/report/:reportId", deleteReport);

module.exports = router;
