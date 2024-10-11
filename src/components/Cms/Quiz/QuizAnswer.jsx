
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import QuizAnswerItem from './QuizAnswerItem';
import { QuizContainer } from './QuizElements.js';

const QuizzesScreen = ({ quizData }) => {
  const [data, setData] = useState(quizData);

  const handleContinue = (questionId) => {
    const updatedQuiz = data.map((item) =>
      item.id === questionId ? { ...item, visible: false } : item
    );
    setData(updatedQuiz);
  };

  const handleSubmit = () => {
    console.log('Quiz submitted');
  };

  return (
    <QuizContainer id="quizzes-screen-container">
      {data.map((v) =>
          <QuizAnswerItem key={v.id} quizItem={v} handleContinue={handleContinue} />
      )}
      {data.every((item) => !item.visible) && (
        <div class='mt-3'>
          <Button type="button" variant="secondary" className="quiz-submit" onClick={handleSubmit}>
          Submit
        </Button>
        </div>
      )}
    </QuizContainer>
  );
};

export default QuizzesScreen;