const mongoose = require("mongoose");

const ReportLog = require("./ReportLog.js");

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["REPORTED", "ASSIGNED", "IN_PROGRESS", "FIXED"],
      default: "REPORTED",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    upVotesCount: {
      type: Number,
      default: 0,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

/*
REPORT
6a9d93d5f63c9563d582a47b
WORKER
{
  "_id": {
    "$oid": "6a9d4b9f5c4ace07d0b1c341"
  },
  "username": "User12",
  "email": "User12@gmail.com",
  "password": "$2b$10$XQswvciVyDP2rfJWG.FaOu854UVATrcTZHZqLO1tqeOUVp0INArw2",
  "role": "WORKER",
  "createdAt": {
    "$date": "2026-09-06T11:16:47.485Z"
  },
  "updatedAt": {
    "$date": "2026-09-06T11:16:47.485Z"
  },
  "__v": 0
}
CITIZIEN
{
  "_id": {
    "$oid": "6a9d4b8c5c4ace07d0b1c340"
  },
  "username": "User11",
  "email": "User11@gmail.com",
  "password": "$2b$10$iPKXFamcjV/My/FKyWatYeqzr6kA9oWKsRCXX6VfpibbcCR9HxrEC",
  "role": "CITIZIEN",
  "createdAt": {
    "$date": "2026-09-06T11:16:28.839Z"
  },
  "updatedAt": {
    "$date": "2026-09-06T11:16:28.839Z"
  },
  "__v": 0
}
*/
