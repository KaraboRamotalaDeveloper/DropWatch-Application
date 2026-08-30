const User = require("../models/User.js");
const Report = require("../models/Report.js");
const { updateReport } = require("./citizienReportHandler.js");

const fetchAllReports = async (req, res) => {
  try {
    const reports = await Report.find();

    if (!reports) {
      return res.status(404).json({ message: "No reports found" });
    }

    return res
      .status(200)
      .json({ message: "Successfully fetched reports", reports });
  } catch (err) {
    console.log(`Error made in fetchAllReports handler: ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const fetchReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ message: "No report found" });
    }

    return res.status(200).json({
      message: "Successfully fetched a report",
      report,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const fetchAndFilterReports = async (req, res) => {
  try {
    //filter[assignedTo]
    const filters = req.query.filter;

    const reports = await Report.find(filters);

    if (!reports || reports.Length === 0) {
      return res.status(404).json({ message: "No reports found" });
    }

    return res
      .status(200)
      .json({ message: "Successfully fetched the filtered reports", reports });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//...update: assignWorker
//...update: updateStatus
const updateReportByAction = async (req, res) => {
  try {
    const { reportId } = req.params;
    const actions = req.body;

    console.log(reportId);
    console.log(actions);

    const updatedReport = await Report.findByIdAndUpdate(reportId, actions);

    if (!updatedReport || updateReport.length === 0) {
      return res.status(404).json({ message: "No report found." });
    }
    return res
      .status(201)
      .json({ message: "Successfully updated report", updatedReport });
  } catch (err) {
    console.log("Error in adminReportHandler" + err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  fetchAllReports,
  fetchReport,
  fetchAndFilterReports,
  updateReportByAction,
};
