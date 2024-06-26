import React, { useState } from 'react';
import { FaqTexts } from '../data/Data';
import Plus from '../../assets/img/plus.svg'
import Minus from '../../assets/img/minus.svg'
import '../../style/Question.css'; // Import your CSS file

const Question = () => {
  const [expanded, setExpanded] = useState([true, ...new Array(FaqTexts.questions.length - 1).fill(false)]);

  const toggleAccordion = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className="question container mx-auto py-12 px-4">
      <div className="space-y-4">
        {FaqTexts.questions.map((qa, index) => (
          <div key={index} className="accordion-item">
            <div className="accordion-header">
              <button
                className="accordion-button"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="accordion-title">{qa.question}                 {expanded[index] ? (
                 <img alt ="min"width= "20"src={Minus}/>
                 
                ) : (
                 <img alt="plus" width="20"src={Plus}/>
                                  
                )}</h3>

              </button>
            </div>
            {expanded[index] && (
              <div className="accordion-content">
                <p className="answer-text">{qa.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;