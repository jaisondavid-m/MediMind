import React, { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import SkeltonLoading from "../Components/SkeltonLoading";

export default function MedicalReport() {
  const [report, setReport] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/ask";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report, city }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const parsed = JSON.parse(data.analysis);
      setResult({
        deficiencies: parsed.deficiencies || [],
        lifestyle_tips: parsed.lifestyle_tips || [],
        doctor_advice: parsed.doctor_advice || "No advice provided",
        hospitals: parsed.hospitals || [],
      });
    } catch {
      setError("Failed to fetch AI analysis");
    } finally {
      setLoading(false);
    }
  };

  const handleNewReport = () => {
    setReport("");
    setCity("");
    setResult(null);
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {!loading && !result && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 transition-colors">
          <div className="mb-4">
            <div className="flex mb-5 items-center space-x-2">
                <TbReportSearch className="text-2xl text-gray-700 dark:text-gray-200" />
                <label className="text-gray-700 dark:text-gray-200 font-medium">Report</label>
              </div>
              <textarea value={report} onChange={(e) => setReport(e.target.value)} rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Describe your symptoms or paste your medical report here…"
              />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter Your City Name"
            />
          </div>

          <div className="flex justify-center"><button type="submit" className="w-44 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Submit</button></div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      )}


      {/* Skeleton Loader */}
      {loading && <SkeltonLoading/> }



      {/* Result */}
      {result && (
  <div className="bg-white dark:bg-gray-800 flex flex-col gap-y-5 shadow-md rounded-lg p-6 transition-colors">
    
    {/* Title */}
    <div className="flex flex-col justify-center items-center mb-4">
      <FaSearchPlus size={30} className="mb-2" />
      <h2 className="text-2xl font-bold text-center">Analysis Result</h2>
    </div>

    {/* Deficiencies */}
    {result.deficiencies?.length > 0 && (
      <div className="mb-4">
        <h3 className="font-bold mb-2">Deficiencies</h3>
        <ul className="list-disc list-inside">
          {result.deficiencies.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </div>
    )}

    {/* Lifestyle Tips */}
      {result.lifestyle_tips?.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Lifestyle Tips</h3>
          <ul className="list-disc list-inside">
            {result.lifestyle_tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      )}

      {/* AI Analysed Advice */}
      {result.doctor_advice && result.doctor_advice.trim() !== "" && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">AI Analysed Advice</h3>
          <p>{result.doctor_advice}</p>
        </div>
      )}

      {/* Hospitals */}
      {result.hospitals?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-bold mb-2">Recommended Hospitals</h3>
          <ul className="list-disc list-inside">
            {result.hospitals.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
      )}

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={handleNewReport}
          className="w-44 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Upload New Report
        </button>
      </div>

    </div>
  )}

    </div>
  );
}