const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    documentUrl: {
      type: String,
      required: true,
    },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    designation: {
      type: String,
      required: true,
    },
    leaveDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
