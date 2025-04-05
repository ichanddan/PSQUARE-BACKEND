const employee = require("../models/employesModel");
const {
  handleError,
  handleSuccess,
  handleInternalServerError,
} = require("../utils/handler");
const bcrypt = require("bcrypt");

module.exports = {
  Add: async (req, res) => {
    try {
      const cheekEmail = await employee.findOne({ email });
      if (cheekEmail) return handleError(res, 400, "Email already exists");
      const user = await employee.create(req.body);
      if (!user) return handleError(res, 400, "Employee registration failed");
      return handleSuccess(res, 200, "Employee registered successfully", user);
    } catch (error) {
      console.error("Error registering user:", error);
      return handleInternalServerError(res);
    }
  },
};
