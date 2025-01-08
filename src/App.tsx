// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./pages/Home";
import ExcelImport from "./components/ExcelImport";
// import "./index"
const App: React.FC = () => {
  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/excelimport" element={<ExcelImport />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
