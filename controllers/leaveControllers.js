const cloudinary = require("../config/cloudinary");
const {
  handleError,
  handleSuccess,
  handleInternalServerError,
} = require("../utils/handler");
const Leave = require("../models/leaveModel");

module.exports = {
  AddLeave: async (req, res) => {
    try {
      const { leaveDate, reason, designation, employeeId } = req.body;
      const { documents } = req.files;

      if (!leaveDate) return handleError(res, 400, "Leave Date is required");
      if (!reason) return handleError(res, 400, "Reason is required");
      if (!designation) return handleError(res, 400, "Designation is required");
      if (!employeeId) return handleError(res, 400, "Employee is required");
      if (!documents) return handleError(res, 400, "Documents is required");

      if (!documents.mimetype.startsWith("image/"))
        return handleError(res, 400, "Only image files are allowed");

      const { secure_url } = await cloudinary.uploader.upload(
        documents.tempFilePath,
        {
          resource_type: "image",
          public_id: "file" + Date.now(),
        }
      );

      const AddLeave = await Leave.create({
        documentUrl: secure_url,
        leaveDate,
        reason,
        designation,
        employeeId,
      });

      return handleSuccess(res, 200, "Leave added successfully", AddLeave);
    } catch (error) {
      console.log(error);
      return handleInternalServerError(res);
    }
  },
};
