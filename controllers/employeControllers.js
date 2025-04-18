const cloudinary = require("../config/cloudinary");
const employee = require("../models/employesModel");
const Leave = require("../models/leaveModel");
const {
  handleError,
  handleSuccess,
  handleInternalServerError,
} = require("../utils/handler");

module.exports = {
  Add: async (req, res) => {
    const { profile } = req.files;
    console.log(req.body, profile);
    try {
      const cheekEmail = await employee.findOne({email:req.body.email});
      if (cheekEmail) return handleError(res, 400, "Email already exists");
      const { secure_url } = await cloudinary.uploader.upload(
        profile.tempFilePath,
        {
          resource_type: "auto",
          public_id: "file" + Date.now(),
        }
      );
      const Employee = await employee.create({
        profileUrl: secure_url,
        ...req.body,
      });
      if (!Employee)
        return handleError(res, 400, "Employee registration failed");
      return handleSuccess(
        res,
        200,
        "Employee registered successfully",
        Employee
      );
    } catch (error) {
      console.error("Error registering Employee:", error);
      return handleInternalServerError(res);
    }
  },
  GetAllEmployee: async (req, res) => {
    try {
      const data = await employee.find();
      return handleSuccess(res, 200, "Employee fetch successfully", data);
    } catch (error) {
      console.error("Error registering Employee:", error);
      return handleInternalServerError(res);
    }
  },
  UpdateEmploys: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await employee.findByIdAndUpdate(id, req.body);
      if (!data) return handleError(res, 400, "Employee update fail");
      return handleSuccess(res, 200, "Employee fetch successfully", data);
    } catch (error) {
      console.error("Error registering Employee:", error);
      return handleInternalServerError(res);
    }
  },
  DeleteEmploys: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await employee.findByIdAndDelete(id);
      // await Leave.findOne({where:{}})
      await Leave.deleteMany({ employeeId: id });

      if (!data) return handleError(res, 400, "Employee delete fail");
      return handleSuccess(res, 200, "Employee delete successfully", data);
    } catch (error) {
      console.error("Error delete Employee:", error);
      return handleInternalServerError(res);
    }
  },
};
