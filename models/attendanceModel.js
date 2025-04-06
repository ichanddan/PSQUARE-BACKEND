const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  tasks: {
    type: Object,
    require: true,
  },
  attendance: {
    type: String,
    enum: ["Absent", "Present"],
    required: true,
  },
  attendanceDate: {
    type: Date,
    required: true,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
