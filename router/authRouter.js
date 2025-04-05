const express = require("express");
const { authController } = require("../controllers");
const router = express.Router();

router.post("/register",authController.register ) 
router.post("/login",authController.Login ) 

module.exports = router;
