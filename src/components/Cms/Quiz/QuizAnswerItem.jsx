import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const QuizAnswerItem = ({ quizItem, handleContinue }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  return (
    <Card className="quiz-item" id={`quiz-item-${quizItem.id}`}>
      <Card.Header>
        <Card.Title className="question-title">{quizItem.question}</Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="question-answers">
          <div className="question-grouped-answers">
            {quizItem.answers.map((answer) => (
              <div key={answer.id} className="question-answer mb-1">
                <input
                  type={quizItem.id === 4 ? 'checkbox' : 'radio'}
                  required={quizItem.required}
                  value={answer.answer}
                  name={`question_${quizItem.id}`}
                  id={answer.id}
                  checked={selectedAnswer === answer.id}
                  onChange={() => handleAnswerSelect(answer.id)}
                />
                <label htmlFor={answer.id} className="m-1">
                  {answer.answer}
                </label>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        {selectedAnswer !== null && (
          <div className="dd-continue-container mt-3">
            <Button type="button" variant="primary" onClick={() => handleContinue(quizItem.id)}>
              Continue
            </Button>
          </div>
        )}
      </Card.Footer>
    </Card>
  );
};

export default QuizAnswerItem;
