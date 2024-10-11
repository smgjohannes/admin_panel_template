import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import StaticPageForm from '../../components/Staticpage/StaticPageForm';
import Breadcrumb from '../../components/Breadcrumb';
import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const StaticPageNew = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('staticPageForm.new')}</title>
        <link rel="canonical" href={window.location.url} />
      </Helmet>
      <Breadcrumb
        pageTitle={t('staticPageForm.new')}
        items={[
          {
            title: t('staticPageForm.title'),
            active: false,
            link: Routes.StaticPages.path,
          },
          {
            title: t('staticPageForm.new'),
            active: true,
            link: '#',
          },
        ]}
      />
      <Row>
        <Col sm={12}>
          <StaticPageForm />
        </Col>
      </Row>
    </>
  );
};

export default StaticPageNew;
