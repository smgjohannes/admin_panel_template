import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { Helmet } from 'react-helmet';

import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { RequestStatus } from '../../constants';
import { endLoader } from '../../features/main';
import { getEditArticle } from '../../features/article/articleSlice';
import ArticleForm from '../../components/Cms/Article/ArticleForm';
import Breadcrumb from '../../components/Breadcrumb';
import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const ArticleEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, article, articleGetStatus, progress } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(getEditArticle({ id, query: { include: 'chapter' } }));
  }, [dispatch, id]);

  const { t } = useTranslation();

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      {articleGetStatus === RequestStatus.Success && article && (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{article.translations[0].title}</title>
          </Helmet>
          <Breadcrumb
            pageTitle={article.translations[0].title}
            items={[
              {
                title: t('chapters'),
                active: false,
                link: Routes.Chapters.path,
              },
              {
                title: article.chapter.translations[0].title,
                active: false,
                link: `/chapters/${article.chapter.id}`,
              },
              {
                title: t('articles'),
                active: false,
                link: Routes.Articles.path,
              },
              {
                title: article.translations[0].title,
                active: true,
                link: `/articles/${article.id}`,
              },
              {
                title: article.translations[0].number,
                active: true,
                link: '#',
              },
            ]}
          />
          <ArticleForm article={article} />
        </>
      )}
      <div className="mt-3">{articleGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}</div>
    </>
  );
};

export default ArticleEditPage;
