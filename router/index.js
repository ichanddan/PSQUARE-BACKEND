const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const candidateRouter = require("./candidateRouter");
const employesRouter = require("./employesRouter");
const leaveRouter = require("./leaveRouter");
const attendanceRouter = require("./attendanceRouter");
const verifyToken = require("../middleware/jwt");

router.use("/auth", authRouter);
router.use("/candidate",verifyToken ,candidateRouter);
router.use("/employs", verifyToken,employesRouter);
router.use("/leave", verifyToken,leaveRouter);
router.use("/attendance",verifyToken ,attendanceRouter);

module.exports = router;