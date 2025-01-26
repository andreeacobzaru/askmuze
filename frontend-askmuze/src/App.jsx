import React, { useState } from "react";
import "./App.css";
import { handleInputChange } from "./functions";
import axios from "axios";

const DecisionApp = () => {
  const [input, setInput] = useState("");
  const [fetchedMessage, setFetchedMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendDataToBackend = async (message) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/data', { message }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response from backend:', response.data);
      return response.data.message;
    } catch (error) {
      console.error('Error sending data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAndFetch = async () => {
    const responseMessage = await sendDataToBackend(input);
    setFetchedMessage(responseMessage);
  };

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
        {/* Header */}
        <h1 className="header-title">Good morning, Andreea</h1>
        <p className="header-subtitle">Let's make good decisions.</p>

        {/* Display Fetched Message */}
        {fetchedMessage && (
          <div className="fetched-message">
            <pre>{fetchedMessage}</pre>
          </div>
        )}

        {/* Display Answer */}
        <div className="answer-section">
          <h2>Answer:</h2>
          <pre>{JSON.stringify(input, null, 2)}</pre>
        </div>

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
          <button onClick={handleSubmitAndFetch} className="submit-button">
            Submit
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && <div className="loading-indicator">Loading...</div>}
      </div>
    </div>
  );
};

export default DecisionApp;
