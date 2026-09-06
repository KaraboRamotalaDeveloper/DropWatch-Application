const mongoose = require("mongoose");

const reportLogSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
      index: true,
    },
    action: [
      {
        type: String,
        enum: [
          "NEW_REPORT",
          "CHANGE_STATUS",
          "CHANGE_ASSIGNED_TO",
          "DELETE_REPORT",
        ],
        default: null,
      },
    ],
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ReportLog = mongoose.model("ReportLog", reportLogSchema);

module.exports = ReportLog;
