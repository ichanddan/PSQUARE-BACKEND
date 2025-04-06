const express = require("express");
const { attendanceControllers } = require("../controllers");
const router = express.Router();

router.post("/add",attendanceControllers.AddAttendance ) 
router.get("/get",attendanceControllers.GetAllAttendance) 
router.put("/update/:id",attendanceControllers.UpdateAttendance) 

module.exports = router;
