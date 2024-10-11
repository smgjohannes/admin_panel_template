import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { Helmet } from 'react-helmet';

import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { RequestStatus } from '../../constants';
import { endLoader } from '../../features/main';
import { getEditPage } from '../../features/staticpage/staticpageSlice';
import StaticPageForm from '../../components/Staticpage/StaticPageForm';
import Breadcrumb from '../../components/Breadcrumb';

import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const StaticPageEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error, page, pageGetStatus, progress } = useSelector((state) => state.page);

  useEffect(() => {
    dispatch(getEditPage({ id, query: { include: 'translations' } }));
  }, [dispatch, id]);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      {pageGetStatus === RequestStatus.Success && (
        <Breadcrumb
          pageTitle={page.title}
          items={[
            {
              title: t('staticPageForm.title'),
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
      )}
      <div className="mt-3">{pageGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}</div>
      {pageGetStatus === RequestStatus.Success && (
        <Row>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{page.title}</title>
            <link rel="canonical" href={window.location.url} />
          </Helmet>
          <Col sm={12}>
            <StaticPageForm page={page} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default StaticPageEdit;
