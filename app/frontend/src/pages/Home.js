import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import InfoPage from '../pages/InfoPage';
// import Row from '../components/Row';
// import { Link } from "react-router-dom";
import bg from '../assets/bg.png';


export default function Home() {
  return (
     <div className="relative min-h-screen text-white">
      {/* 🔹 Background Image with Blur */}
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'blur(2px)' }}
      />
      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* 🔹 Content on top of background */}
      <div className="relative z-10">
        <Header />
        <Banner />
        <InfoPage/>
      </div>
    </div>
  );
};