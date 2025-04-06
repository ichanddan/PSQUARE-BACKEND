const express = require("express");
const { leaveControllers } = require("../controllers");
const router = express.Router();

router.post("/add", leaveControllers.AddLeave);
router.get("/getAll", leaveControllers.GetLeave);


module.exports = router;
