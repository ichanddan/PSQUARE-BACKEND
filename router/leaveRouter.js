const express = require("express");
const { leaveControllers } = require("../controllers");
const router = express.Router();

router.post("/add", leaveControllers.AddLeave);
router.get("/getAll", leaveControllers.GetLeave);
router.put("/update-status/:id", leaveControllers.UpdateStatus);


module.exports = router;
