const PDFDocument = require("pdfkit");
const StudentModel = require("../models/user.model");
const result = async (req, res) => {
  try {
    const student = req.student;

    res.json({
      success: true,
      message: "Result displayed successfully",
      rollNumber: req.body.rollNumber,
      class: req.body.class,
      subjects: Object.fromEntries(student.subjects)
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


const downloadResultPDF = async (req, res) => {
  try {
    const student = req.student;

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Result_${student.rollNumber}.pdf`);

    doc.pipe(res);

    doc.fontSize(20).text("Student Result", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Name: ${student.name}`);
    doc.text(`Roll Number: ${req.body.rollNumber}`);
    doc.text(`Class: ${req.body.class}`);
    doc.moveDown();

    // Table headers
    doc.fontSize(16).text("Subjects & Marks:", { underline: true });
    doc.moveDown(0.5);

    const subjects = Object.fromEntries(student.subjects);

    // Table columns positions
    const tableTop = doc.y;
    const subjectX = 50;
    const marksX = 300;
    const maxMarksX = 400;
    const gradeX = 500;

    // Draw headers
    doc.fontSize(12).text("Subject", subjectX, tableTop, { bold: true });
    doc.text("Obtained Marks", marksX, tableTop);
    doc.text("Max Marks", maxMarksX, tableTop);
    doc.text("Grade", gradeX, tableTop);

    doc.moveDown(0.5);

    let totalMarks = 0;
    let obtainedMarks = 0;
    let pass = true;

    const maxPerSubject = 100; // Assuming max marks per subject is 100

    let y = doc.y;

    for (const [subject, marks] of Object.entries(subjects)) {
      totalMarks += maxPerSubject;
      obtainedMarks += marks;
      if (marks < 35) pass = false;

      // Grade per subject
      let grade = "";
      const percent = (marks / maxPerSubject) * 100;

      if (percent >= 75) grade = "A+";
      else if (percent >= 60) grade = "A";
      else if (percent >= 50) grade = "B";
      else if (percent >= 35) grade = "C";
      else grade = "F";

      doc.fontSize(12).text(subject, subjectX, y);
      doc.text(marks.toString(), marksX, y);
      doc.text(maxPerSubject.toString(), maxMarksX, y);
      doc.text(grade, gradeX, y);

      y += 20;
    }

    doc.moveDown(2);

    // Summary
    const percentage = (obtainedMarks / totalMarks) * 100;

    // Division based on total percentage
    let division = "";
    if (percentage >= 75) division = "Distinction";
    else if (percentage >= 60) division = "First Division";
    else if (percentage >= 50) division = "Second Division";
    else if (percentage >= 35) division = "Pass";
    else division = "Fail";

    const resultStatus = pass ? "Pass" : "Fail";

    doc.fontSize(14).text(`Total Marks: ${totalMarks}`);
    doc.text(`Obtained Marks: ${obtainedMarks}`);
    doc.text(`Percentage: ${percentage.toFixed(2)}%`);
    doc.text(`Division: ${division}`);
    doc.text(`Result: ${resultStatus}`);

    doc.end();

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// const generatePdfFromData = (req, res) => {
//   try {
//     const { name, rollNumber, class: className, subjects } = req.body;

//     if (!name || !rollNumber || !className || !subjects || Object.keys(subjects).length === 0) {
//       return res.status(400).json({ success: false, message: "Please provide name, rollNumber, class, and subjects with marks" });
//     }

//     const doc = new PDFDocument({ margin: 30, size: 'A4' });

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=Result_${rollNumber}.pdf`);

//     doc.pipe(res);

//     doc.fontSize(20).text("Student Result", { align: "center" });
//     doc.moveDown();

//     doc.fontSize(14).text(`Name: ${name}`);
//     doc.text(`Roll Number: ${rollNumber}`);
//     doc.text(`Class: ${className}`);
//     doc.moveDown();

//     // Table headers
//     doc.fontSize(16).text("Subjects & Marks:", { underline: true });
//     doc.moveDown(0.5);

//     const tableTop = doc.y;
//     const subjectX = 50;
//     const marksX = 300;
//     const maxMarksX = 400;
//     const gradeX = 500;

//     doc.fontSize(12).text("Subject", subjectX, tableTop, { bold: true });
//     doc.text("Obtained Marks", marksX, tableTop);
//     doc.text("Max Marks", maxMarksX, tableTop);
//     doc.text("Grade", gradeX, tableTop);

//     doc.moveDown(0.5);

//     let totalMarks = 0;
//     let obtainedMarks = 0;
//     let pass = true;
//     const maxPerSubject = 100;

//     let y = doc.y;

//     for (const [subject, marks] of Object.entries(subjects)) {
//       totalMarks += maxPerSubject;
//       obtainedMarks += marks;
//       if (marks < 35) pass = false;

//       let grade = "";
//       const percent = (marks / maxPerSubject) * 100;
//       if (percent >= 75) grade = "A+";
//       else if (percent >= 60) grade = "A";
//       else if (percent >= 50) grade = "B";
//       else if (percent >= 35) grade = "C";
//       else grade = "F";

//       doc.fontSize(12).text(subject, subjectX, y);
//       doc.text(marks.toString(), marksX, y);
//       doc.text(maxPerSubject.toString(), maxMarksX, y);
//       doc.text(grade, gradeX, y);

//       y += 20;
//     }

//     doc.moveDown(2);

//     const percentage = (obtainedMarks / totalMarks) * 100;

//     let division = "";
//     if (percentage >= 75) division = "Distinction";
//     else if (percentage >= 60) division = "First Division";
//     else if (percentage >= 50) division = "Second Division";
//     else if (percentage >= 35) division = "Pass";
//     else division = "Fail";

//     const resultStatus = pass ? "Pass" : "Fail";

//     doc.fontSize(14).text(`Total Marks: ${totalMarks}`);
//     doc.text(`Obtained Marks: ${obtainedMarks}`);
//     doc.text(`Percentage: ${percentage.toFixed(2)}%`);
//     doc.text(`Division: ${division}`);
//     doc.text(`Result: ${resultStatus}`);

//     doc.end();

//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

module.exports = { result,downloadResultPDF };
