const Attendance = require("../models/attendanceModel");
const {
  handleError,
  handleSuccess,
  handleInternalServerError,
} = require("../utils/handler");

module.exports = {
  AddAttendance: async (req, res) => {
    const data = req.body;
    try {
      const user = await Attendance.create(data);
      if (!user) return handleError(res, 400, "Attendance add failed");
      return handleSuccess(res, 200, "Attendance add successfully", user);
    } catch (error) {
      console.error("Error add Attendance:", error);
      return handleInternalServerError(res);
    }
  },
  GetAllAttendance: async (req, res) => {
    try {
      const CandidateList = await Attendance.find().populate(
        "employeeId",
        "name profileUrl position department"
      );
      return handleSuccess(
        res,
        200,
        "Attendance fetch successfully",
        CandidateList
      );
    } catch (error) {
      console.error("Error registering Candidate:", error);
      return handleInternalServerError(res);
    }
  },
  UpdateAttendance: async (req, res) => {
    try {
      const { id } = req.params;
      const CandidateList = await Attendance.findByIdAndUpdate(id, req.body);
      return handleSuccess(
        res,
        200,
        "Attendance update successfully",
        CandidateList
      );
    } catch (error) {
      console.error("Error registering Candidate:", error);
      return handleInternalServerError(res);
    }
  },
};
