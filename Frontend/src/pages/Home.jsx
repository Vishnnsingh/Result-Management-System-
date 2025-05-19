import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";

const Home = () => {
  const { students, isFetched } = useContext(StudentContext); // 🟢 include isFetched
  const [rollNumber, setRollNumber] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = students.find(
      (s) => s.rollNumber === rollNumber && s.class === classNumber
    );

    if (student) {
      navigate(`/students/${student.id}`);
    } else {
      setError("Student not found! Please check Roll Number and Class.");
    }
  };

  if (!isFetched) {
    return <p>Loading data... Please wait.</p>;  // 🟢 added loading check
  }

  return (
    <div>
      <h1>Welcome to Student Result Portal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Roll Number:</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Class Number:</label>
          <input
            type="text"
            value={classNumber}
            onChange={(e) => setClassNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Check Result</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Home;
