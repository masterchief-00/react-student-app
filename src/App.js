import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import Student from "./pages/Student";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
