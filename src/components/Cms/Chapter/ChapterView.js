import React from 'react';
import { Card } from 'react-bootstrap';
import ArticlesTable from '../Article/Articles';
import MarkUp from '../../MarkUp';

const ChapterView = (props) => {
  const { chapter } = props;

  return (
    <Card className="mb-2">
      <Card.Header>
        <Card.Title>{chapter.number}</Card.Title>
      </Card.Header>
      {chapter.translations[0].description && (
        <Card.Body>
          <Card.Text>
            <MarkUp content={chapter.translations[0].description} />
          </Card.Text>
        </Card.Body>
      )}
      {chapter.articles && chapter.articles.length > 0 && (
        <Card.Body>
          <ArticlesTable articles={chapter.articles} />
        </Card.Body>
      )}
    </Card>
  );
};

export default ChapterView;
