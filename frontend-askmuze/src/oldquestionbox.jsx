// import React, { useState, useRef } from 'react';
// import './QuestionBox.css';

// const QuestionBox = ({ onSubmit }) => {
//   const [newQuestion, setNewQuestion] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const newSectionRef = useRef(null); // Ref for the new section

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && newQuestion.trim()) {
//       setQuestions([...questions, newQuestion]);
//       onSubmit(newQuestion); // Call the onSubmit function with the new question
//       setNewQuestion('');
//       scrollToNewSection(); // Trigger the scroll animation
//     }
//   };

//   const scrollToNewSection = () => {
//     newSectionRef.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="question-box-container">
//       {/* Main screen */}
//       <div className="main-screen">
//         <div className="input-area">
//           <input
//             type="text"
//             value={newQuestion}
//             onChange={(e) => setNewQuestion(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Your question: type here"
//           />
//         </div>
//       </div>

//       {/* New section */}
//       <div ref={newSectionRef} className="new-section">
//         <div className="question-list">
//           {questions.map((question, index) => (
//             <div key={index} className="question">
//               {question}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionBox;
