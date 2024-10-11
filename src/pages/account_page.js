import React from 'react';
import { Helmet } from 'react-helmet';

import Breadcrumb from '../components/Breadcrumb';
import Account from '../components/Account';
import { useTranslation } from 'react-i18next';

const AccountPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Breadcrumb
        pageTitle={t('myAccount')}
        items={[
          {
            title: t('myAccount'),
            active: true,
            link: '#',
          },
        ]}
      />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('myAccount')}</title>
        <link rel="canonical" href={window.location.url} />
      </Helmet>
      <Account />
    </>
  );
};

export default AccountPage;
