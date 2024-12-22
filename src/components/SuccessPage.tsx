import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  return (
    <div className="text-center p-6">
      <h2 className="text-3xl font-semibold mb-4">Data Imported Successfully!</h2>
      <p className="text-xl mb-6">The data from the Excel file has been successfully uploaded.</p>
      <Link to="/" className="text-blue-600 hover:underline">Go back to upload more files</Link>
    </div>
  );
};

export default SuccessPage;
