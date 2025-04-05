const express = require("express");
const router = express.Router();
const authRouter = require("./authRouter");
const candidateRouter = require("./candidateRouter");

router.use("/auth", authRouter);
router.use("/candidate", candidateRouter);

module.exports = router;