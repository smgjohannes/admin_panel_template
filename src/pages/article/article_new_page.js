import React from 'react';
import { Helmet } from 'react-helmet';
import ArticleForm from '../../components/Cms/Article/ArticleForm';
import Breadcrumb from '../../components/Breadcrumb';
import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const ArticleNewPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t('newArticle')}</title>
      </Helmet>
      <Breadcrumb
        pageTitle={t('articles')}
        items={[
          {
            title: t('articles'),
            active: false,
            link: Routes.Articles.path,
          },
          {
            title: t('newArticle'),
            active: true,
            link: '#',
          },
        ]}
      />
      <ArticleForm />
    </>
  );
};

export default ArticleNewPage;
