const express = require("express");
const { candidateControllers } = require("../controllers");
const router = express.Router();

router.post("/add", candidateControllers.AddCandidate);
router.get("/get-all", candidateControllers.GetAllCandidate);

module.exports = router;
