import React, { useState, useRef } from 'react';
import './QuestionBox.css';

const QuestionBox = ({ onSubmit, aiResponses, questionNumber, finalDecision, input, setInput, loading }) => {
  const [questions, setQuestions] = useState([]);
  const newSectionRef = useRef(null); // Ref for the new section

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      setQuestions([...questions, input]);
      onSubmit(input); // Call the onSubmit function with the new question
      setInput('');
      scrollToNewSection(); // Trigger the scroll animation
    }
  };

  const scrollToNewSection = () => {
    newSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="question-box-container">
      {/* New section */}
      <div ref={newSectionRef} className="new-section">
        <div className="question-list">
          {questions.map((question, index) => (
            <div key={index}>
              <div className="question">{question}</div>
                {aiResponses[index] && index !== 3 && (
                  <div className="ai-response">
                    {aiResponses[index]}
                  </div>
                )}
            </div>
            )
          )}
        </div>
        {loading && <div className="loading-indicator"></div>}
      </div>

      {/* Final decision */}
      {finalDecision && (
        <div className="input-header-section" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="300"
          height="300"
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
        <p>
          {finalDecision}
        </p>
      </div>
      )}

      {/* Input area */}
      {!finalDecision && !loading &&(
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="type here"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default QuestionBox;
