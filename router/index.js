const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const candidateRouter = require("./candidateRouter");
const employesRouter = require("./employesRouter");
const leaveRouter = require("./leaveRouter");
const attendanceRouter = require("./attendanceRouter");

router.use("/auth", authRouter);
router.use("/candidate", candidateRouter);
router.use("/employs", employesRouter);
router.use("/leave", leaveRouter);
router.use("/attendance", attendanceRouter);

module.exports = router;