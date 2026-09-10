//models
const User = require("../models/User.js");
const Report = require("../models/Report.js");

///create report
const logReport = async (req, res) => {
  try {
    const { userId } = req.user;

    const { title, description, photoUrl, address } = req.body;

    if (!title || !description || !photoUrl || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (userId.toString() !== "" || userId !== null || userId !== undefined) {
      const report = new Report({
        title,
        description,
        photoUrl,
        address,
        reportedBy: userId,
      });

      await report.save();

      return res
        .status(201)
        .json({ message: "Report logged successsfully", report });
    } else {
      return res.status(403).json({
        message: "User is not authorized or authenticated to log a report",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//fetch all reports
const fetchReports = async (req, res) => {
  try {
    const { role } = req.user;
    const { userId } = req.user;

    const normalizedRoles = role ? role.toLowerCase() : null;
    let filter = { isDeleted: { $ne: true } };

    if (normalizedRoles === "worker") {
      filter.assignedTo = userId;
    } else if (normalizedRoles === "citizien") {
      filter.reportedBy = userId;
    } else if (normalizdRoles !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to perform action" });
    }

    const reports = await Report.find(filter);

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "No reports found" });
    }

    return res.status(200).json({
      message: "Successfully found the reports",
      numReports: reports.length,
      reports,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
//fetch by filters
const fetchReportsByFilter = async (req, res) => {
  try {
    const { role, userId } = req.user;

    const normalizedRole = role ? role.toLowerCase() : null;

    const {
      status,
      priority,
      isDeleted,
      assignedTo,
      reportedBy,
      updatedBy,
      createdAt,
      updatedAt,
    } = req.query;

    if (
      !status &&
      !priority &&
      !isDeleted &&
      !assignedTo &&
      !reportedBy &&
      !updatedBy &&
      !createdAt &&
      !updatedAt
    ) {
      return res
        .status(400)
        .json({ message: "At least one filter is required" });
    }

    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (isDeleted !== undefined) filter.isDeleted = isDeleted;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (reportedBy) filter.reportedBy = reportedBy;
    if (updatedBy) filter.updatedBy = updatedBy;
    if (createdAt) filter.createdAt = createdAt;
    if (updatedAt) filter.updatedAt = updatedAt;

    let reports;

    switch (normalizedRole) {
      case "admin":
        reports = await Report.find(filter);
        break;
      case "worker":
        reports = await Report.find({ ...filter, assignedTo: userId });
        break;
      case "citizien":
        reports = await Report.find({ ...filter, reportedBy: userId });
        break;
      default:
        reports = [];
        break;
    }

    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "No reports found" });
    }

    return res.status(200).json({
      message: "Successfully fetched the filteredreports",
      numReports: reports.length,
      reports,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
//fetch a report by id
const fetchReportById = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { userId, role } = req.user;

    const normalizedRole = role ? role.toLowerCase() : "";

    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    switch (normalizedRole) {
      case "worker":
        if (!report.assignedTo || report.assignedTo?.toString() !== userId) {
          return res
            .status(403)
            .json({ message: "Not authorized to perform this action" });
        }
        break;
      case "citizien":
        if (!report.reportedBy || report.reportedBy?.toString() !== userId) {
          return res
            .status(403)
            .json({ message: "Not authorized to perform this action" });
        }
        break;
    }

    return res
      .status(200)
      .json({ message: "Successfully retrieved the report", report });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//update report
const updateReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { role, userId } = req.user;

    const normalizedRole = role ? role.toLowerCase() : null;

    const {
      title,
      description,
      photoUrl,
      address,
      status,
      assignedTo,
      priority,
      isDeleted,
    } = req.body;

    let actions = {};

    if (normalizedRole === "citizien") {
      if (title) actions.title = title;
      if (description) actions.description = description;
      if (photoUrl) actions.photoUrl = photoUrl;
      if (address) actions.address = address;
      if (isDeleted !== undefined) actions.isDeleted = isDeleted;
    } else if (normalizedRole === "worker") {
      if (status) actions.status = status;
      if (priority) actions.priority = priority;
    } else if (normalizedRole === "admin") {
      if (assignedTo) actions.assignedTo = assignedTo;
      if (status) actions.status = status;
      if (priority) actions.priority = priority;
      if (isDeleted !== undefined) actions.isDeleted = isDeleted;
    }

    if (Object.keys(actions).length === 0) {
      return res.status(400).json({ message: "No update actions provided" });
    }

    const report = await Report.findById(reportId);

    if (!report || report.length === 0) {
      return res.status(404).json({ message: "Report does not exist." });
    }

    console.log("Report before update:", report);

    switch (normalizedRole) {
      case "admin":
        if (actions.assignedTo) {
          const worker = await User.findById(actions.assignedTo);
          if (!worker || worker.role.toLowerCase() !== "worker") {
            return res
              .status(400)
              .json({ message: "Invalid worker ID provided" });
          }

          console.log("Worker found:", worker);
          report.assignedTo = actions.assignedTo || report.assignedTo;
        }
        if (actions.status) report.status = actions.status || report.status;
        if (actions.priority)
          report.priority = actions.priority || report.priority;

        break;
      case "worker":
        if (userId !== report.assignedTo?.toString()) {
          return res
            .status(403)
            .json({ message: "Not authorized to perform this action" });
        }

        if (actions.status) report.status = actions.status || report.status;
        if (actions.priority)
          report.priority = actions.priority || report.priority;

        break;
      case "citizien":
        if (actions.assignedTo || actions.status || actions.priority) {
          return res.status(403).json({
            message: "Not authorized to perform these actions",
          });
        }

        if (userId === report.reportedBy?.toString()) {
          return res
            .status(403)
            .json({ message: "Not authorized to perform this action" });
        }

        if (actions.title) report.title = actions.title || report.title;
        if (actions.photoUrl)
          report.photoUrl = actions.photoUrl || report.photoUrl;
        if (actions.description)
          report.description = actions.description || report.description;
        if (actions.address) report.address = actions.address || report.address;

        break;
      default:
        break;
    }

    report.updatedBy = userId;
    await report.save();

    console.log("Report after update:", report);

    return res.status(201).json({
      message: "Report updated successfully",
      report,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//soft delete a report
const deleteReport = async (req, res) => {
  try {
    const { role, userId } = req.user;
    const { reportId } = req.params;
    const normalizedRole = role ? role.toLowerCase() : null;

    if (normalizedRole !== "citizien") {
      return res
        .status(403)
        .json({ message: "Not authorized to perform this action" });
    }

    const report = await Report.findById(reportId);

    if (!report || report.length === 0) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (userId !== report.reportedBy?.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to perform this action" });
    }

    report.isDeleted = true;
    report.updatedBy = userId;

    await report.save();

    return res
      .status(200)
      .json({ message: "Successfully deleted the report", report });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  logReport,
  fetchReports,
  fetchReportsByFilter,
  fetchReportById,
  updateReport,
  deleteReport,
};
