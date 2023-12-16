import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CreateTaskPage from "./pages/CreateTask";
import PrivateRoute from "./components/PrivateRoute";
import Report from "./components/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
        <Route path="/reports" element={
          <PrivateRoute>
            <Report />
          </PrivateRoute>
        } />
      </Routes>
      {/* <Footer /> */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
