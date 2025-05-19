import { createContext, useEffect, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [isFetched, setIsFetched] = useState(false); // 👈 added flag

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setIsFetched(true); // 👈 mark as fetched
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <StudentContext.Provider value={{ students, isFetched }}>
      {children}
    </StudentContext.Provider>
  );
};

