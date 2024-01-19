import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./App.css";
import { prettyDOM } from "@testing-library/react";

const path = `https://gitabackend.onrender.com`;

const App = () => {
  const [file, setFile] = useState(null);
  const [showGif, setShowGif] = useState(false); // State to control the display of the GIF

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        console.error("Please select an Excel file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const binaryString = event.target.result;
        const workbook = XLSX.read(binaryString, { type: "binary" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const processedData = [];

        for (let i = 0; i < rows.length; i++) {
          const numberInColumnA = rows[i][0];

          if (typeof numberInColumnA === "number") {
            const word = rows[i][1].trim();
            const content = rows[i].slice(2).filter(Boolean).join("__");
            processedData.push({ word, content });
          }
        }
// console.log(processedData);
        // Simulate a POST request (replace with your actual API call)
        const response = await axios.post(`${path}/api/words`, processedData);

        // Show the GIF after successful submission
        setShowGif(true);
      };

      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <label>
          Upload Excel File:
          <input type="file" accept=".xls, .xlsx" onChange={handleFileUpload} />
        </label>

        <button type="submit">Submit</button>
      </form>

      {showGif && (
        <iframe
          src="https://giphy.com/embed/48HUcXwM5Yt6E"
          width="480"
          height="353"
          className="giphy-embed"
          title="Bhagavad Gita Giphy"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default App;
