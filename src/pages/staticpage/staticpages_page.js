import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../../components/Breadcrumb';
import StaticPagesList from '../../components/Staticpage/StaticPagesList';
import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const StaticPageList = () => {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb
        pageTitle={'Pages'}
        items={[
          {
            title: 'Pages',
            active: true,
            link: '#',
          },
        ]}
      >
        <Button as={Link} to={Routes.StaticPageNew.path}>
          <FontAwesomeIcon icon={faPlus} /> New Page
        </Button>
      </Breadcrumb>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('pages')}</title>
        <link rel="canonical" href={window.location.url} />
      </Helmet>
      <StaticPagesList />
    </>
  );
};

export default StaticPageList;
