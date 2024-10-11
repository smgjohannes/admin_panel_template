import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../routes';

import Breadcrumb from '../../components/Breadcrumb';
import ArticlesTable from '../../components/Cms/Article/Articles';
import { useTranslation } from 'react-i18next';

const ArticlesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb
        pageTitle={t('articles')}
        items={[
          {
            title: t('articles'),
            active: true,
            link: '#',
          },
        ]}
      >
        <Button as={Link} to={Routes.ArticleNew.path}>
          <FontAwesomeIcon icon={faPlus} /> {t('newArticle')}
        </Button>
      </Breadcrumb>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('articles')}</title>
        <link rel="canonical" href={window.location.url} />
      </Helmet>
      <ArticlesTable />
    </>
  );
};

export default ArticlesPage;
