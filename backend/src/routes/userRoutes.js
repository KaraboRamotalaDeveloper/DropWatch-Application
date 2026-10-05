const express = require("express");
const { getUsers } = require("../controllers/userHandlers.js");
const { authZ } = require("../middlewares/auth.js");

const router = express.Router();

// GET /api/users
router.get("/", getUsers);

module.exports = router;
