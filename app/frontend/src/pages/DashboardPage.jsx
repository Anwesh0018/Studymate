import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleChoice = (examType) => {
    switch (examType) {
      case "UPSC":
        navigate("/upsc");
        break;
      case "JEE":
        navigate("/jee");
        break;
      case "NEET":
        navigate("/neet");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text text-center">
        Welcome {user?.username || "User"}
      </h1>

      {/* Exam Selection Card */}
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl mb-12">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-100">Choose Your Exam</h2>
        <div className="space-y-4">
          {["UPSC", "JEE", "NEET"].map((exam) => (
            <div
              key={exam}
              onClick={() => handleChoice(exam)}
              className="bg-blue-100 text-black font-semibold text-lg text-center py-4 rounded-xl cursor-pointer hover:bg-blue-200 transition hover:scale-105 shadow"
            >
              {exam}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow transition"
        >
          🏠 Home
        </button>
        <button
          onClick={() => navigate("/account")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow transition"
        >
          👤 Profile
        </button>
        <button
          onClick={() => navigate("/exams")}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow transition"
        >
          📝 Exams
        </button>
      </div>
    </div>
  );
}