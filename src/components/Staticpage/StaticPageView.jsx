import React from 'react';
import { Card } from 'react-bootstrap';
import MarkUp from '../MarkUp';

const StaticPageView = (props) => {
  const { page } = props;
  const { descriptions } = page;

  return (
    <>
      <Card className="mb-2">
        <Card.Body>
          <Card.Text>
            {descriptions.map((r) => (
              <MarkUp content={r.content} />
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default StaticPageView;
