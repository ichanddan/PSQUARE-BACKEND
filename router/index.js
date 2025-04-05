const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const candidateRouter = require("./candidateRouter");
const employesRouter = require("./employesRouter");

router.use("/auth", authRouter);
router.use("/candidate", candidateRouter);
router.use("/employs", employesRouter);

module.exports = router;