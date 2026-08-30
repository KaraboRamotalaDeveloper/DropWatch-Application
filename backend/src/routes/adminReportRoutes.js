const express = require("express");
const router = express.Router();

const {
  fetchAllReports,
  fetchReport,
  fetchAndFilterReports,
  updateReportByAction,
} = require("../controllers/adminReportHandlers.js");

router.use((req, res, next) => {
  console.log("Inside adminReportRoutes! Path remaining:", req.path);
  next();
});
//admin
//get reports
router.get("/fetchallreports", fetchAllReports);
router.get("/fetchreport/filtered", fetchAndFilterReports);
router.post("/updatereport/:reportId/adminactions", updateReportByAction);
router.get("/fetchreport/:reportId", fetchReport);
//get reports for worker : assignTo
//update
//...update: assignWorker
//...update: updateStatus

module.exports = router;
