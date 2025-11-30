import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import MedicalReport from "../Pages/MedicalReport";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Optional: persist mode in localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <MedicalReport />
    </div>
  );
}