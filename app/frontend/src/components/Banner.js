// components/Banner.js
import React from 'react';
import { Link , useNavigate } from "react-router-dom";

export default function Banner() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        const storedUser = localStorage.getItem("user")
        if (storedUser){
            navigate("/dashboard");
        }else{
            navigate("/login");
        }
    };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-white text-center animate-fade-in">
      <h1 className="text-5xl font-bold animate-slide-up">Welcome to Studymate</h1>
      <p className="mt-4 text-lg animate-slide-up delay-200">Your gateway to Notes, Questions, and Success in competitive exams.</p>
      <button onClick={handleGetStarted}
        className="mt-6 px-6 py-3 bg-red-600 rounded text-white font-semibold hover:bg-red-700 animate-slide-up delay-500"
      >
        Get Started
      </button>
    </div>
  );
};