import React from 'react';
import { Row, Card, Col } from 'react-bootstrap';

const QuizParticipants = ({ ...props }) => {
  const { participants } = props;
  return (
    <Card>
      <Card.Header>
        <Card.Title>Participants</Card.Title>
      </Card.Header>
      <Card.Body>
        <Col className="mb-3">
          {participants.length > 0 &&
            participants.map((p, index) => (
              <Row className="mb-3">
                <Card.Subtitle className="mb-3">{p.number}</Card.Subtitle>
              </Row>
            ))}
        </Col>
      </Card.Body>
    </Card>
  );
};

export default QuizParticipants;
