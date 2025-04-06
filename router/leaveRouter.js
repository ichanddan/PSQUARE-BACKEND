const express = require("express");
const { leaveControllers } = require("../controllers");
const router = express.Router();

router.post("/add", leaveControllers.AddLeave);


module.exports = router;
