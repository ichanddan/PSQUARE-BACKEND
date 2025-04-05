const User = require("../models/authModel");
const {
  handleError,
  handleSuccess,
  handleInternalServerError,
} = require("../utils/handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name) return handleError(res, 400, "Name is required");
    if (!email) return handleError(res, 400, "Email is required");
    if (!password) return handleError(res, 400, "Password is required");
    if (password !== confirmPassword)
      return handleError(res, 400, "Conform Password Not Matched");
    if (!confirmPassword)
      return handleError(res, 400, "Confirm Password is required");
    if (password.length < 6)
      return handleError(
        res,
        400,
        "Password must be at least 6 characters long"
      );

    try {
      const cheekEmail = await User.findOne({ email });
      if (cheekEmail) return handleError(res, 400, "Email already exists");
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
  Login: async (req, res) => {
    const { email, password } = req.body;

    if (!email) return handleError(res, 400, "Email is required");
    if (!password) return handleError(res, 400, "Password is required");
    if (password.length < 6)
      return handleError(
        res,
        400,
        "Password must be at least 6 characters long"
      );

    try {
      const user = await User.findOne({ email });
      if (!user) return handleError(res, 400, "Email not found");

      const matched = bcrypt.compareSync(password, user.password);
      if (!matched) return handleError(res, 400, "Email or password is wrong");

      // Generate JWT
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      const expiresIn = new Date();
      expiresIn.setHours(expiresIn.getHours() + 2);
      return handleSuccess(res, 200, "Login successful", {
        user,
        token,
        expiresIn,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      return handleInternalServerError(res);
    }
  },
};
