import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Students from "./pages/Students.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    )
  },
  {
    path: "/students",
    element: (
      <>
        <Navbar />
        <Students />
      </>
    )
  },
  {
    path: "/students/:id",
    element: (
      <>
        <Navbar />
        <StudentDetails />
      </>
    )
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
