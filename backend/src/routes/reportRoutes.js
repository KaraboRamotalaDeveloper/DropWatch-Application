const express = require("express");

const router = express.Router();

//controllers
const {
  fetchReports,
  fetchReportsByFilter,
  logReport,
  fetchReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportHandlers.js");

//admin\
// - create report
router.post("/logreport", logReport);
// - get all reports
router.get("/fetchreports", fetchReports);
router.get("/fetchreports/:reportId", fetchReportById);
router.get("/fetchreports/filtered", fetchReportsByFilter);
// - can get filtered reports
// - can assign report - update
// - can update status - update

router.patch("/updatereport/:reportId", updateReport);
router.delete("/delreport/:reportId", deleteReport);

module.exports = router;
