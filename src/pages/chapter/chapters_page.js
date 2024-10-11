import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../components/Breadcrumb';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';
import Chapters from '../../components/Cms/Chapter/Chapters';

const ChaptersPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb
        pageTitle={t('chapters')}
        items={[
          {
            title: t('chapters'),
            active: true,
            link: '#',
          },
        ]}
      >
        <Button as={Link} to={Routes.ChapterNew.path}>
          <FontAwesomeIcon icon={faPlus} /> {t('newChapter')}
        </Button>
      </Breadcrumb>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('chapters')}</title>
        <link rel="canonical" href={window.location.url} />
      </Helmet>
      <Chapters />
    </>
  );
};

export default ChaptersPage;
