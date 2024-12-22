import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExcelImport from './components/ExcelImport'; // Import the ExcelImport component
import SuccessPage from './components/SuccessPage';
// import SuccessPage from './components/SuccessPage'; // Optional success page after data import

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-semibold">Excel File Importer</h1>
            <p className="mt-2 text-lg">Upload and import your Excel files with ease</p>
          </div>
        </header>

        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<ExcelImport />} />
            <Route path="/success" element={<SuccessPage/>} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center py-4">
          <p>© 2024 Your Company</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
