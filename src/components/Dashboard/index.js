import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { useTranslation } from 'react-i18next';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import { getDashboard } from '../../features/dashboardSlice';
import { endLoader } from '../../features/main';
import { RequestStatus } from '../../constants';
import Empty from '../Empty';
import { CounterWidget } from '../Widgets';

const DashboardView = () => {
  const { dashboard, progress, dashboardGetStatus } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      {dashboardGetStatus === RequestStatus.Success && dashboard && (
        <Row className="justify-content-md-center row">
          <Col xs={12} sm={6} xl={3} className="mb-4">
            <CounterWidget
              category={t('chapters')}
              title={dashboard.totalChapters}
              icon={faUserGroup}
              iconColor="shape-secondary"
            />
          </Col>
          <Col xs={12} sm={6} xl={3} className="mb-4">
            <CounterWidget
              category={t('articles')}
              title={dashboard.totalArticles}
              icon={faUserGroup}
              iconColor="shape-secondary"
            />
          </Col>
          <Col xs={12} sm={6} xl={3} className="mb-4">
            <CounterWidget
              category={t('audios')}
              title={dashboard.totalAudios}
              icon={faUserGroup}
              iconColor="shape-secondary"
            />
          </Col>
          <Col xs={12} sm={6} xl={3} className="mb-4">
            <CounterWidget
              category={t('quizzes')}
              title={dashboard.totalQuizzes}
              icon={faUserGroup}
              iconColor="shape-secondary"
            />
          </Col>
        </Row>
      )}
      {dashboardGetStatus === RequestStatus.Getting && (
        <Row className="justify-content-md-center row">
          <Col className="mb-4">
            <Empty message={t('contentLoading')} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default DashboardView;
