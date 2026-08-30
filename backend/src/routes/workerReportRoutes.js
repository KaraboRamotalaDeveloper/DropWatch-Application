const express = require("express");

const router = express.Router();

const {
  fetchAssignedReports,
  fetchReport,
  updateReport,
} = require("../controllers/workerReportHandlers.js");

router.use((req, res, next) => {
  console.log("Inside workerReportRoutes! Path remaining:", req.path);
  next();
});

router.get("/fetchreports", fetchAssignedReports);
router.get("/fetchreport/:reportId", fetchReport);
router.post("/updatereport/:reportId", updateReport);

module.exports = router;
