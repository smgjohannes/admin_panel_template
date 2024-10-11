import React from 'react';
import { Card } from 'react-bootstrap';
import MarkUp from '../../MarkUp';

const QuizQuestionView = (props) => {
  const { quizQuestion } = props;

  return (
    <>
      <Card className="mb-2">
        <Card.Header>
          <Card.Title>{quizQuestion.question}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <MarkUp content={quizQuestion.description} />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default QuizQuestionView;
