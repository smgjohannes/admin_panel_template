import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { Helmet } from 'react-helmet';

import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { RequestStatus } from '../../constants';
import { endLoader } from '../../features/main';
import { getChapterById } from '../../features/chapter/chapterSlice';
import ChapterForm from '../../components/Cms/Chapter/ChapterForm';
import Breadcrumb from '../../components/Breadcrumb';

import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const ChapterEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { error, chapter, chapterGetStatus, progress } = useSelector((state) => state.chapter);

  useEffect(() => {
    dispatch(getChapterById({ id }));
  }, [dispatch, id]);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      {chapterGetStatus === RequestStatus.Success && (
        <Breadcrumb
          pageTitle={chapter.translations[0].title}
          items={[
            {
              title: t('chapters'),
              active: false,
              link: Routes.Chapters.path,
            },
            {
              title: chapter.translations[0].title,
              active: true,
              link: '#',
            },
          ]}
        />
      )}
      <div className="mt-3">{chapterGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}</div>
      {chapterGetStatus === RequestStatus.Success && (
        <Row>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{chapter.translations[0].title}</title>
            <link rel="canonical" href={window.location.url} />
          </Helmet>
          <Col sm={12}>
            <ChapterForm chapter={chapter} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default ChapterEditPage;
