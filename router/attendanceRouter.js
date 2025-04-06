const express = require("express");
const { attendanceControllers } = require("../controllers");
const router = express.Router();

router.post("/add",attendanceControllers.AddAttendance ) 
router.get("/get",attendanceControllers.GetAllAttendance) 

module.exports = router;
