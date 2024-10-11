import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../components/Breadcrumb';
import MediaTable from '../../components/Media';
import { useTranslation } from 'react-i18next';

const MediasPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb
        pageTitle={t('files')}
        items={[
          {
            title: t('files'),
            active: true,
            link: '#',
          },
        ]}
      ></Breadcrumb>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('files')}</title>
        <link rel="canonical" href={window.location.url} />
      </Helmet>
      <MediaTable />
    </>
  );
};

export default MediasPage;
