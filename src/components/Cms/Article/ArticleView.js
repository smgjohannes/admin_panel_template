import React from 'react';
import { Button, Card } from 'react-bootstrap';

import MarkUp from '../../MarkUp';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import { useTranslation } from 'react-i18next';

const ArticleView = (props) => {
  const { article } = props;
  const { t } = useTranslation();

  return (
    <>
      <Card className="mb-2">
        <Card.Header>
          <Card.Title>{article.translations[0].title}</Card.Title>
          <Card.Subtitle>{article.translations[0].number}</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <MarkUp content={article.translations[0].content} />
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="mt-3">
            <Button variant="secondary" as={Link} to={Routes.Articles.path}>
              {t('back')}
            </Button>{' '}
            <Button variant="primary" as={Link} to={`/articles/${article.id}/edit`}>
              {t('edit')}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ArticleView;
