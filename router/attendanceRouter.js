const express = require("express");
const { attendanceControllers } = require("../controllers");
const router = express.Router();

router.post("/add",attendanceControllers.AddAttendance ) 

module.exports = router;
