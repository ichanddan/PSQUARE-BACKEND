const User = require("../models/authModel");
const {
  handleError,
  handleSuccess,
  handleInternalServerError,
} = require("../utils/handler");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name) return handleError(res, 400, "Name is required");
    if (!email) return handleError(res, 400, "Email is required");
    if (!password) return handleError(res, 400, "Password is required");
    if (password.length < 6)
      return handleError(
        res,
        400,
        "Password must be at least 6 characters long"
      );

    try {
      const cheekEmail = await User.findOne({ email });
      if (cheekEmail) return handleError(res, 409, "Email already exists");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({ name, email, password: hashedPassword });
      if (!user) return handleError(res, 400, "User registration failed");
      return handleSuccess(res, 200, "User registered successfully", user);
    } catch (error) {
      console.error("Error registering user:", error);
      return handleInternalServerError(res);
    }
  },
};
