const express = require("express");
const userController = require("../controllers/user.controller");
const verifyStudent = require("../middlewares/verifyStudent.middleware");

const router = express.Router();

// POST /api/v1/user/result
router.post("/result", verifyStudent, userController.result);
//  to download PDF of result
router.post("/result/download", verifyStudent, userController.downloadResultPDF);

module.exports = router;
