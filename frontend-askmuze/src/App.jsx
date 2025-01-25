import React, { useState, useEffect } from "react";
import "./App.css";
import { handleInputChange, handleSubmit } from "./functions";
import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/api/data'); // Ensure the URL is correct
    console.log('Fetched data:', response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
  }
};

const DecisionApp = () => {
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-title">ask muze.</div>
        <div className="sidebar-content">
          <p className="sidebar-username">Andreea</p>
          <select className="sidebar-dropdown">
            <option>Profile</option>
            <option>Settings</option>
            <option>Log out</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button onClick={fetchData}>Fetch Data</button>
        {/* Header */}
        <h1 className="header-title">Good morning, Andreea</h1>
        <p className="header-subtitle">Let's make good decisions.</p>

        {/* Suggested Questions */}
        <div className="suggested-questions">
          {["Should I take a gap year?", "Am I ready to move in with someone?", "Sport", "Press", "Is this the right time to buy a home?", "Plants"].map((question, index) => (
            <button key={index} className="question-button">
              {question}
            </button>
          ))}
        </div>

        {/* Input Section */}
        <div className="input-section">
          <input
            value={input}
            onChange={(e) => handleInputChange(e, setInput)}
            placeholder="What are you deciding?"
            className="input-box"
          />
          <button onClick={() => handleSubmit(input, setInput)} className="submit-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionApp;
