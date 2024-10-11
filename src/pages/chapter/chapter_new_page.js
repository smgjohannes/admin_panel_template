import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import ChapterForm from '../../components/Cms/Chapter/ChapterForm';
import Breadcrumb from '../../components/Breadcrumb';
import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const ChapterNewPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('newChapter')}</title>
        <link rel="canonical" href={window.location.url} />
      </Helmet>
      <Breadcrumb
        pageTitle={t('newChapter')}
        items={[
          {
            title: t('chapters'),
            active: false,
            link: Routes.Chapters.path,
          },
          {
            title: t('newChapter'),
            active: true,
            link: '#',
          },
        ]}
      />
      <Row>
        <Col sm={12}>
          <ChapterForm />
        </Col>
      </Row>
    </>
  );
};

export default ChapterNewPage;
