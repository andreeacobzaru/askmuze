import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import QuestionBox from './QuestionBox.jsx';

const DecisionApp = () => {
  const [clarifyingQuestion, setClarifyingQuestion] = useState(null);
  const [finalDecision, setFinalDecision] = useState(null);
  const [threadId, setThreadId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [aiResponses, setAiResponses] = useState([]);
  const [input, setInput] = useState("");
  const presetOptions = ["Should I take a gap year?", "Am I ready to move in with someone?", "Should I monetize my creative work or keep it a hobby?", "Should I study abroad or stay local?", "Is this the right time to buy a home?", "Do I want to adopt a cat?", "Should I dump my boyfriend?"]

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
      setQuestionNumber(1);
      setAiResponses([response.data.clarifying_question]);
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
        setAiResponses(prev => [...prev, res.data.final_decision]);
      } else {
        setClarifyingQuestion(res.data.clarifying_question);
        setQuestionNumber(prev => prev + 1);
        setAiResponses(prev => [...prev, res.data.clarifying_question]);
      }
    } catch (error) {
      console.error('Error continuing chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async (question) => {
    if (!threadId) {
      await startChat(question);
    } else {
      await continueChat(question);
    }
  };

  const handlePresetClick = (question) => {
    setInput(question);
  };

  return (
    <div className="app-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <h1 className="header-title">Ask Muze.</h1>
        <p className="header-subtitle">Let's fix your dilemma.</p>

        {/* Display Clarifying Question or Final Decision */}
        {/* {clarifyingQuestion && questionNumber <= 3 && (
          <div className="clarifying-question">
            <h2>Clarifying Question:</h2>
            <pre>{clarifyingQuestion}</pre>
          </div>
        )}
        {finalDecision && questionNumber > 3 && (
          <div className="final-decision">
            <h2>Final Decision:</h2>
            <pre>{finalDecision}</pre>
          </div>
        )} */}

        {/* Suggested Questions */}
        <div className="suggested-questions">
          {presetOptions.map((question, index) => (
            <button key={index} className="question-button" onClick={() => handlePresetClick(question)}>
              {question}
            </button>
          ))}
        </div>

        <div className="input-header-section" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 80 100"
            fill="none"
          >
            <path
              d="M89.9845 37.8898H85.2599V47.37H80.5042V42.6454H75.7797V37.8898H85.2599V33.1652H75.7797V28.4095H71.0551V47.37H66.2994V52.0946H23.685V47.37H18.9294V28.4095H14.2203V33.1652H4.72457V37.8898H14.2203V42.6454H9.48023V47.37H4.72457V37.8898H0V52.0946H4.72457V56.8502H14.2203V89.9844H18.9449V94.7401H23.7006V99.4646H66.315V94.7401H71.0706V89.9844H75.7952V56.8502H85.2754V52.0946H90L89.9845 37.8898ZM71.0551 66.3305H18.9294V61.5748H71.0551V66.3305Z"
              fill="#C1EDCB"
            />
            <path d="M71.0555 23.6853H66.2998V28.4099H71.0555V23.6853Z" fill="#C1EDCB" />
            <path d="M71.0555 4.75476H66.2998V14.2039H71.0555V4.75476Z" fill="#C1EDCB" />
            <path d="M66.2978 14.2042H61.5732V23.6845H66.2978V14.2042Z" fill="#C1EDCB" />
            <path d="M66.2996 0H56.8193V4.75566H66.2996V0Z" fill="#C1EDCB" />
            <path d="M61.575 33.1648H56.8193V37.8894H61.575V33.1648Z" fill="#C1EDCB" />
            <path d="M56.8183 4.75476H52.0938V14.2039H56.8183V4.75476Z" fill="#C1EDCB" />
            <path d="M52.0957 14.2042H47.3711V18.9599H52.0957V14.2042Z" fill="#C1EDCB" />
            <path
              d="M42.6152 47.3698H47.3709V42.6452H52.0954V37.8895H37.8906V42.6452H42.6152V47.3698Z"
              fill="#C1EDCB"
            />
            <path d="M47.3699 18.9607H42.6143V23.6853H47.3699V18.9607Z" fill="#C1EDCB" />
            <path d="M42.6152 14.2042H37.8906V18.9599H42.6152V14.2042Z" fill="#C1EDCB" />
            <path d="M37.8904 4.75476H33.1348V14.2039H37.8904V4.75476Z" fill="#C1EDCB" />
            <path d="M33.1328 33.1648H28.4082V37.8894H33.1328V33.1648Z" fill="#C1EDCB" />
            <path d="M33.1337 0H23.6846V4.75566H33.1337V0Z" fill="#C1EDCB" />
            <path d="M28.4091 14.2042H23.6846V23.6845H28.4091V14.2042Z" fill="#C1EDCB" />
            <path d="M23.6844 23.6853H18.9287V28.4099H23.6844V23.6853Z" fill="#C1EDCB" />
            <path d="M23.6844 4.75476H18.9287V14.2039H23.6844V4.75476Z" fill="#C1EDCB" />
          </svg>
          <p>Hi. I’m Muze, your decision-making companion. Please type your question below, and we’ll get started.</p>
        </div>

        <p style={{ marginTop: '20px', textAlign: 'center'}}>mind the gap</p>
        <div className="input-section">
          <QuestionBox onSubmit={handleQuestionSubmit} aiResponses={aiResponses} questionNumber={questionNumber} finalDecision={finalDecision} input={input} setInput={setInput} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default DecisionApp;