import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react"; // make sure to install this with: npm install lucide-react

export default function Header() {
  const [user, setUser] = useState(null);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const savedLang = localStorage.getItem("language");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
        setUser(null);
      }
    }

    if (savedLang) {
      setLanguage(savedLang);
    }

    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "bn", label: "বাংলা" },
    { code: "ta", label: "தமிழ்" },
  ];

  const getLangLabel = (code) => {
    const found = languageOptions.find((l) => l.code === code);
    return found ? found.label : "Language";
  };

  return (
    <header className="sticky left-0 w-full flex justify-between items-center text-white p-4 z-50">
      <h1 className="text-5xl font-extrabold text-[#e50914] uppercase tracking-tighter">
        STUDYMATE
      </h1>

      <nav className="space-x-4 relative flex items-center">
        {user ? (
          <div className="flex items-center gap-x-6 relative">
            {/* 🌐 Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded-md hover:border-white transition"
              >
                <span className="text-lg">🌐</span>
                <span className="text-sm">{getLangLabel(language)}</span>
                <ChevronDown size={16} />
              </button>

              {langDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-black border border-gray-700 text-white rounded-md shadow-lg z-50">
                  {languageOptions.map(({ code, label }) => (
                    <li key={code}>
                      <button
                        onClick={() => {
                          setLanguage(code);
                          localStorage.setItem("language", code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-800 ${
                          language === code ? "bg-gray-700 font-bold" : ""
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 👤 User Icon + Name */}
            <button
              className="flex flex-col items-center gap-y-1 hover:text-red-500 focus:outline-none"
              onClick={() => navigate("/account")}
            >
              <img
                    src={user.profilePic}
                    alt="profile"
                    className="w-10 h-10 flex items-center justify-center rounded-full"
              />
                {/*{user.username}*/}
              <span className="text-sm">{user?.username || "Account"}</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded px-3 py-3 bg-red-600 text-white hover:bg-red-700 transition"
          >
            Login/Register
          </Link>
        )}
      </nav>
    </header>
  );
}