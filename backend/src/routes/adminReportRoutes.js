const express = require("express");
const router = express.Router();

const { fetchAllReports } = require("../controllers/adminReportHandler");

//admin
//get all reports
router.get("/fetchAllReports", fetchAllReports);
//get reports for worker : assignTo
//update
//...update: assignWorker
//...update: updateStatus

module.exports = router;
