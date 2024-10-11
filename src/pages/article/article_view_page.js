import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { Helmet } from 'react-helmet';
import ArticleView from '../../components/Cms/Article/ArticleView';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import Breadcrumb from '../../components/Breadcrumb';
import { RequestStatus } from '../../constants';
import { endLoader } from '../../features/main';
import { getArticleById, getArticleByNumber, getArticleBySlug } from '../../features/article/articleSlice';
import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const ArticleViewPage = () => {
  const { id, number, slug } = useParams();
  const dispatch = useDispatch();
  const { error, article, articleGetStatus, progress } = useSelector((state) => state.article);

  useEffect(() => {
    if (number) {
      dispatch(getArticleByNumber({ number, query: { include: 'chapter' } }));
    }

    if (slug) {
      dispatch(getArticleBySlug({ slug, query: { include: 'chapter' } }));
    }

    if (!number && !slug && id) {
      dispatch(getArticleById({ id, query: { include: 'chapter' } }));
    }
  }, [dispatch, id, slug, number]);

  const { t } = useTranslation();

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      {articleGetStatus === RequestStatus.Success && (
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
        </>
      )}
      <div className="mt-3">
        {articleGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {articleGetStatus === RequestStatus.NetworkError && <ErrorAlert message={error} />}
      </div>
      {articleGetStatus === RequestStatus.Success && <ArticleView article={article} />}
    </>
  );
};

export default ArticleViewPage;
