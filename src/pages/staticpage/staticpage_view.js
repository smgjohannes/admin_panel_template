import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import PageView from '../../components/Staticpage/StaticPageView';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { RequestStatus } from '../../constants';

import { endLoader } from '../../features/main';
import { getPageById } from '../../features/staticpage/staticpageSlice';

import Breadcrumb from '../../components/Breadcrumb';

import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const StaticPageView = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, page, pageGetStatus, progress } = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(getPageById({ id, query: { include: 'media' } }));
  }, [dispatch, id]);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      <div className="mt-3">{pageGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}</div>
      {pageGetStatus === RequestStatus.Success && (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{page.title}</title>
            <link rel="canonical" href={window.location.url} />
          </Helmet>
          <Breadcrumb
            pageTitle={page.title}
            items={[
              {
                title: 'Pages',
                active: false,
                link: Routes.StaticPages.path,
              },
              {
                title: page.title,
                active: true,
                link: '#',
              },
            ]}
          >
            <Button as={Link} to={Routes.StaticPageNew.path}>
              {t('staticPageForm.new')}
            </Button>
          </Breadcrumb>
          <PageView page={page} />
        </>
      )}
    </>
  );
};

export default StaticPageView;
