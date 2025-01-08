// src/pages/Home.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Label Printing App</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/signup")}
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/signin")}
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Home;
