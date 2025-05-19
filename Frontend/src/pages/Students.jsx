import { useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { Link } from "react-router-dom";

const Students = () => {
  const { students } = useContext(StudentContext);

  return (
    <div>
      <h2>Students List</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>
              {student.name} (Class {student.class}) - Roll {student.rollNumber}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
