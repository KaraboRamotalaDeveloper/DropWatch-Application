//models
const User = require("../models/User.js");
const Report = require("../models/Report.js");
require("dotenv").config();

const supabase = require("../configs/supabase.js");

///create report
const logReport = async (req, res) => {
  console.log("In logReport handler");
  console.log(
    supabase
      ? "Supabase client is initialized"
      : "Supabase client is NOT initialized",
  );
  try {
    const userId = req.user?.userId;

    // 1. Verify user authentication first
    if (!userId) {
      return res.status(401).json({
        message: "User is not authorized or authenticated to log a report",
      });
    }

    // 2. Validate file presence
    if (!req.file) {
      return res.status(400).json({ message: "An image file is required" });
    }
    const fileExt = req.file.originalname.split(".").pop();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const filePath = `uploads/${fileName}`;

    console.log("File extension:", fileExt); // Debugging line to check the file extension
    console.log("Generated file name:", fileName); // Debugging line to check the generated file name
    console.log("Generated file path:", filePath); // Debugging line to check the generated file path

    console.log("supabase =", supabase);
    console.log("supabase.storage =", supabase?.storage);
    console.log("supabase.storage.from =", supabase?.storage?.from);

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });
    if (error) {
      console.error("Supabase upload error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    const photoUrl = data.path; // Multer-Cloudinary populates this URL
    console.log(req.body);
    const { title, description, address } = req.body;

    // 3. Validate required text fields
    if (!title || !description || !address) {
      // Optional cleanup: Delete from Cloudinary here if using cloudinary SDK
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("req.body:", req.body); // Debugging line to check the request body
    // 4. Create and save report
    const report = new Report({
      title,
      description,
      photoUrl,
      address,
      reportedBy: userId,
    });

    await report.save();

    return res.status(201).json({
      message: "Report logged successfully",
      report,
      url: publicUrlData.publicUrl,
      path: data.path,
    });
  } catch (err) {
    console.error("Error logging report:", err.message);
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
    } else if (normalizedRoles !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to perform action" });
    }

    const reports = await Report.find(filter).populate(
      "assignedTo",
      "username email",
    );
    console.log("Fetched reports before generatedUrls:", reports); // Debugging line to check the fetched reports
    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: "No reports found" });
    }
    const DEFAULT_IMAGE_URL =
      "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800&auto=format&fit=crop&q=60";

    const reportsWithUrls = reports.map((report) => {
      console.log("Processing report:", report); // Debugging line to check each report before generating URL
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(report.photoUrl);
      console.log("Generated public URL for report:", data?.publicUrl); // Debugging line to check the generated public URL
      // If Supabase gives us a URL, use it
      if (data?.publicUrl) {
        report.photoUrl = data.publicUrl;
      }

      return report;
    });
    console.log("Reports with generated URLs:", reportsWithUrls); // Debugging line to check the final reports array
    return res.status(200).json({
      message: "Successfully found the reports",
      numReports: reportsWithUrls.length,
      reports: reportsWithUrls,
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

    const { filter } = req.query;
    if (filter.assignedTo === "null") {
      filter.assignedTo = null;
    }
    if (filter.reportedBy === "null") {
      filter.reportedBy = null;
    }
    if (filter.updatedBy === "null") {
      filter.updatedBy = null;
    }

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
    console.log("error: " + err.message);
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

    console.log("reportId:" + reportId);

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

    let actions = {};

    if (normalizedRole === "citizien") {
      if (req.body.title) actions.title = req.body.title;
      if (req.body.description) actions.description = req.body.description;
      if (req.body.photoUrl) actions.photoUrl = req.body.photoUrl;
      if (req.body.address) actions.address = req.body.address;
      if (req.body.upVotes) actions.upVotes = req.body.upVotes;
      if (req.body.isDeleted !== undefined)
        actions.isDeleted = req.body.isDeleted;
    } else if (normalizedRole === "worker") {
      if (req.body.status) actions.status = req.body.status;
      if (req.body.priority) actions.priority = req.body.priority;
    } else if (normalizedRole === "admin") {
      if (req.body.assignedTo) actions.assignedTo = req.body.assignedTo;
      if (req.body.status) actions.status = req.body.status;
      if (req.body.priority) actions.priority = req.body.priority;
      if (req.body.isDeleted !== undefined)
        actions.isDeleted = req.body.isDeleted;
    }

    console.log(actions);

    if (Object.keys(actions).length === 0) {
      return res.status(400).json({
        message:
          "No update actions provided or not authorized to perform this action",
      });
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
          console.log("status before assignment:", report.status);
          console.log("actions.status before updating:", actions.status);
          if (report.status === "REPORTED") {
            report.status = "ASSIGNED";
          }
          report.status = actions.status || report.status;
          console.log("status after assignment:", report.status);
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

        if (userId !== report.reportedBy?.toString()) {
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
        if (actions.upVotes) report.upVotes = actions.upVotes || report.upVotes;
        if (actions.isDeleted !== undefined)
          report.isDeleted = actions.isDeleted || report.isDeleted;
        break;
      default:
        break;
    }

    report.updatedBy = userId;
    console.log("Report after applying updates but before save:", report);
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
