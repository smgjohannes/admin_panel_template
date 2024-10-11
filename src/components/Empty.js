import React from 'react';
import { Card } from 'react-bootstrap';

const Empty = ({ children, ...props }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Text>{props.message}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Empty;
