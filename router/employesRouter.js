const express = require("express");
const { employeControllers } = require("../controllers");
const router = express.Router();

router.post("/add", employeControllers.Add);
router.put("/update/:id", employeControllers.UpdateEmploys);
router.get("/get-all-employs", employeControllers.GetAllEmployee);
router.delete("/delete/:id", employeControllers.DeleteEmploys);

module.exports = router;
