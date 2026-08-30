const User = require("../models/User.js");
const Report = require("../models/Report.js");

const fetchAssignedReports = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(userId);
    const reports = await Report.find({ assignedTo: userId });

    if (!reports) {
      return res.status(404).json({ message: "No reports found" });
    }

    return res.status(200).json({
      message: "Successfully fetched worker assigned reports",
      reports,
    });
  } catch (err) {
    console.log(err.message);
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

    return res
      .status(200)
      .json({ message: "Successfully fetched a report", report });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateReport = async (req, res) => {
  const actions = req.body;
  const { userId } = req.user;

  const updateData = { ...actions, updatedBy: userId };

  const updatedReport = await Report.findByIdAndUpdate(reportId, actions, {
    new: true,
    runValidators: true,
  });
};

module.exports = { fetchAssignedReports, fetchReport, updateReport };
