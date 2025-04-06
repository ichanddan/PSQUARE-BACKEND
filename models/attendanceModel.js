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
    default: "Absent",
  },
  attendanceDate: {
    type: Date,
    default: new Date(),
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
