import React, { useState } from "react";
import "./App.css";
import { handleInputChange } from "./functions";
import axios from "axios";

const DecisionApp = () => {
  const [input, setInput] = useState("");
  const [clarifyingQuestion, setClarifyingQuestion] = useState(null);
  const [finalDecision, setFinalDecision] = useState(null);
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(false);

  const startChat = async (question) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/start_chat', { question }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response from backend:', response.data);
      setThreadId(response.data.thread_id);
      setClarifyingQuestion(response.data.clarifying_question);
    } catch (error) {
      console.error('Error starting chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const continueChat = async (response) => {
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/continue_chat', { thread_id: threadId, response }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response from backend:', res.data);
      if (res.data.final_decision) {
        setFinalDecision(res.data.final_decision);
      } else {
        setClarifyingQuestion(res.data.clarifying_question);
      }
    } catch (error) {
      console.error('Error continuing chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAndFetch = async () => {
    if (!threadId) {
      await startChat(input);
    } else {
      await continueChat(input);
    }
    setInput("");
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

        {/* Display Clarifying Question or Final Decision */}
        {clarifyingQuestion && (
          <div className="clarifying-question">
            <h2>Clarifying Question:</h2>
            <pre>{clarifyingQuestion}</pre>
          </div>
        )}
        {finalDecision && (
          <div className="final-decision">
            <h2>Final Decision:</h2>
            <pre>{finalDecision}</pre>
          </div>
        )}

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
