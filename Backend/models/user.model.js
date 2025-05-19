const mongoose = require("mongoose");

// Student Schema with dynamic subjects
const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  class: { type: String, required: true },
  name: { type: String, required: true },
  subjects: {
    type: Map,
    of: Number, // subject name: marks
    required: true
  }
});

module.exports = mongoose.model("Student", studentSchema);
