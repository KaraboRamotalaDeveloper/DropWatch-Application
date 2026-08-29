const User = require("../models/User.js");
const Report = require("../models/Report.js");

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

module.exports = { fetchAllReports };
