import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import styles from "../styles/StudentDetails.module.css"; // 👈 module css import

const StudentDetails = () => {
  const { id } = useParams();
  const { students } = useContext(StudentContext);
  const navigate = useNavigate(); // ✅

  const student = students.find((s) => s.id === parseInt(id));

  if (!student) {
    return <div>Student not found!</div>;
  }

  const totalMarks = Object.keys(student.subjects).length * 100;
  const obtainedMarks = Object.values(student.subjects).reduce((acc, mark) => acc + mark, 0);
  const percentage = (obtainedMarks / totalMarks) * 100;
  const division =
    percentage >= 60
      ? "First Division"
      : percentage >= 45
      ? "Second Division"
      : percentage >= 33
      ? "Third Division"
      : "Fail";
  const passOrFail = percentage >= 33 ? "PASS" : "FAIL";

  return (
    
    <div className={styles.resultContainer}>
      {/* 👇 BACK BUTTON */}
      <button className={styles.backButton} onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className={styles.header}>
        <img src="/logo.png" alt="School Logo" className={styles.logo} />
        <div className={styles.schoolName}>ABC SCHOOL</div>
      </div>
      <h2 className={styles.heading}>Final Examination Result</h2>

      <div className={styles.info}>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Father's Name:</strong> Mr. Sharma</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Section:</strong> A</p>
        <p><strong>Roll Number:</strong> {student.rollNumber}</p>
      </div>

      <table className={styles.resultTable}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Max Marks</th>
            <th>Marks Obtained</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(student.subjects).map(([subject, marks], index) => (
            <tr key={index}>
              <td>{subject}</td>
              <td>100</td>
              <td>{marks}</td>
              <td>
                {marks >= 90
                  ? "A+"
                  : marks >= 80
                  ? "A"
                  : marks >= 70
                  ? "B"
                  : marks >= 60
                  ? "C"
                  : marks >= 50
                  ? "D"
                  : "E"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.summary}>
        <p><strong>Total Marks:</strong> {totalMarks}</p>
        <p><strong>Marks Obtained:</strong> {obtainedMarks}</p>
        <p><strong>Division:</strong> {division}</p>
        <p><strong>Status:</strong> {passOrFail}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.stamp}>[School Stamp]</div>
        <div className={styles.signature}>Principal's Signature</div>
      </div>
    </div>
  );
};

export default StudentDetails;

