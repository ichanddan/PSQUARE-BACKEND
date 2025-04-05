const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

module.exports = connectDB;
