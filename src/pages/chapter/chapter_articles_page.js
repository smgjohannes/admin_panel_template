import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../components/Breadcrumb';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';
import { endLoader } from '../../features/main';
import { getChapterById } from '../../features/chapter/chapterSlice';
import { RequestStatus } from '../../constants';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import ArticlesTable from '../../components/Cms/Article/Articles';

const ChapterArticlesPage = () => {
  const { t } = useTranslation();
  const { chapterId } = useParams();
  const dispatch = useDispatch();
  const { error, chapter, chapterGetStatus, progress } = useSelector((state) => state.chapter);

  useEffect(() => {
    dispatch(getChapterById({ id: chapterId, query: { include: 'translations.media' } }));
  }, [dispatch, chapterId]);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      <div className="mt-3">{chapterGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}</div>

      {chapterGetStatus === RequestStatus.Success && chapter && (
        <>
          <Breadcrumb
            pageTitle={t('chapters')}
            items={[
              {
                title: t('chaptersPage.articles'),
                active: true,
                link: '#',
              },
              {
                title: chapter.translations[0].title,
                active: false,
                link: `/chapters/${chapter.id}`,
              },
              {
                title: t('articles'),
                active: false,
                link: Routes.Articles.path,
              },
            ]}
          >
            <Button as={Link} to={Routes.ChapterNew.path}>
              <FontAwesomeIcon icon={faPlus} /> {t('chaptersPage.articles')}
            </Button>
          </Breadcrumb>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{t('chapters')}</title>
            <link rel="canonical" href={window.location.url} />
          </Helmet>
          <ArticlesTable chapter={chapter} />
        </>
      )}
    </>
  );
};

export default ChapterArticlesPage;
