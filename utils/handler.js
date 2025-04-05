const handleError = (res, stats, message) => {
  res.status(stats).json({
    success: false,
    message: message,
  });
};
const handleSuccess = (res, stats, message, data) => {
  res.status(stats).json({
    success: true,
    message: message,
    data: data,
  });
};
const handleInternalServerError = (res) => {
  res.status(500).json({
    success: true,
    message: "Internal server error",
  });
};

module.exports = {
  handleError,
  handleSuccess,
  handleInternalServerError,
};
