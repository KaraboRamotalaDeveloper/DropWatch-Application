const User = require("../models/User.js");
const Report = require("../models/Report.js");
const ReportLog = require("../models/ReportLog.js");

//CITIZIEN
//get all reports for user : reportedBY
const fetchCitizienReports = async (req, res) => {
  try {
    const { userId } = req.user;

    const reports = await Report.find({ reportedBy: userId });

    if (!reports) {
      return res.status(401).json(`{message: "No reports for user ${userId}"}`);
    }

    return res
      .status(200)
      .json({ message: "Successfully fetched the reports", reports });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//create report
const logReport = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name, description, photoUrl, address } = req.body;

    const report = await Report.create({
      name,
      description,
      photoUrl,
      address,
      reportedBy: userId,
    });

    report.save();

    return res
      .status(201)
      .json({ message: "Successfully created a report", report });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//update report
const updateReport = async (req, res) => {
  try {
    const { userId } = req.user;
    const { reportId } = req.params;
    const changes = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { $set: changes },
      { new: true, runValidators: true }, // Returns the updated doc and runs schema checks
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "There report does not exit" });
    }

    return res.status(201).json({
      message: "Successfully updated the report report",
      updatedReport,
    });
  } catch (err) {
    console.log(`Error in updateReport handler : ${err.message}`);
  }
};
//delete report
const deleteReport = async (req, res) => {
  try {
    const { userId } = req.user;
    const { reportId } = req.params;

    console.log(reportId);

    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "The report does not exist" });
    }

    if (userId !== report.reportedBy.toString()) {
      return res
        .status(403)
        .json({ message: "User not authorized to perform action" });
    }

    await report.deleteOne();
    return res.status(200).json({ message: "Successfully deleted the report" });
  } catch (err) {
    console.log(`Error in deleteReport handler : ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//admin
//get all reports
//get reports for worker : assignTo
//update
//...update: assignWorker
//...update: updateStatus

//worker
//get worker reports : userId === assignedTo
//update report status

module.exports = {
  logReport,
  fetchCitizienReports,
  updateReport,
  deleteReport,
};
