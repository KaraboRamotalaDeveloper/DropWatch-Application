const mongoose = require("mongoose");

const reportLogSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
      index: true,
    },
    action: {
      type: String,
      enum: ["REPORTED", "CHANGE_STATUS", "CHANGE_ASSIGNED_TO"],
      default: null,
    },
    prevStatus: {
      type: String,
    },
    prevAssignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    newStatus: {
      type: String,
    },
    newAssignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    actionPerfomedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    note: {
      type: String,
    },
  },
  { timestamps: true },
);

const ReportLog = mongoose.model("ReportLog", reportLogSchema);

module.exports = ReportLog;
