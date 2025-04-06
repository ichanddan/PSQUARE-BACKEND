const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    profileUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      require: true,
    },
    date_of_joining: {
      type: String,
      required: true,
    },
    attendance: {
      type: String,
      default:'Absent'
    },
  },
  {
    timestamps: true,
  }
);

const employee = mongoose.model("Employee", employeeSchema);

module.exports = employee;
