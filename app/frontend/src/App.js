import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Register from "./pages/RegisterPage";
import Notes from "./pages/Notes";
import DashboardPage from "./pages/DashboardPage";
import { useLocation } from 'react-router-dom';
import JeePage from './pages/JEE';
import  UpscPage from './pages/UPSC';
import NeetPage from './pages/NEET';
import AccountPage from "./pages/Account";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation(); // hook to get current path

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Pages where padding should be removed
  const noPaddingRoutes = ["/login", "/register"];
  const shouldAddPadding = !noPaddingRoutes.includes(location.pathname);

  return (
    <>
      <div className={shouldAddPadding ? "pt-0" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/upsc" element={<UpscPage />} />
          <Route path="/jee" element={<JeePage />} />
          <Route path="/neet" element={<NeetPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;