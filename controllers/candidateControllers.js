const cloudinary = require("../config/cloudinary");
const Candidate = require("../models/candidateModel");
const {
  handleError,
  handleSuccess,
  handleInternalServerError,
} = require("../utils/handler");

module.exports = {
  AddCandidate: async (req, res) => {
    const { name, email, number, position, experience, informationRight } =
      req.body;
    const { resume } = req.files;
    if (!name) return handleError(res, 400, "Name is required");
    if (!email) return handleError(res, 400, "Email is required");
    if (!number) return handleError(res, 400, "Number is required");
    if (!position) return handleError(res, 400, "Position is required");
    if (!resume) return handleError(res, 400, "Resume is required");
    if (!experience) return handleError(res, 400, "Experience is required");

    try {
      const cheekEmail = await Candidate.findOne({ email });
      if (cheekEmail) return handleError(res, 400, "Email already exists");
      const { secure_url } = await cloudinary.uploader.upload(resume.tempFilePath, {
        resource_type: "auto",
        public_id: "file" + Date.now(),
      });
      const user = await Candidate.create({
        name,
        email,
        number,
        position,
        experience,
        informationRight,
        resume: secure_url,
      });
      if (!user) return handleError(res, 400, "Candidate registration failed");
      return handleSuccess(res, 200, "Candidate registered successfully", user);
    } catch (error) {
      console.error("Error registering Candidate:", error);
      return handleInternalServerError(res);
    }
  },
  GetAllCandidate: async (req, res) => {
    try {
      const CandidateList = await Candidate.find();
      return handleSuccess(res, 200, "Candidate fetch successfully", CandidateList);
    } catch (error) {
      console.error("Error registering Candidate:", error);
      return handleInternalServerError(res);
    }
  },
  DeleteCandidate: async (req, res) => {
    try {
      const {id} = req.params;
      const CandidateList = await Candidate.findByIdAndDelete(id);
      if (CandidateList) {
        return handleSuccess(res, 200, "Candidate Delete successfully", CandidateList);
      }
    } catch (error) {
      console.error("Error registering Candidate:", error);
      return handleInternalServerError(res);
    }
  },
};
