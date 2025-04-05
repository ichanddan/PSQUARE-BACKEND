const express = require("express");
const { employeControllers } = require("../controllers");
const router = express.Router();

router.post("/add", employeControllers.Add);

module.exports = router;
