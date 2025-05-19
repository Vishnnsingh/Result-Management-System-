const StudentModel = require("../models/user.model");

const verifyStudent = async (req, res, next) => {
  try {
    const { rollNumber, class: className } = req.body;

    if (!rollNumber || !className) {
      return res
        .status(400)
        .json({ success: false, message: "rollNumber and class are required" });
    }

    const student = await StudentModel.findOne({
      rollNumber,
      class: className
    });

    if (!student) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    req.student = student; // Attach student to request
    next();
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = verifyStudent;
