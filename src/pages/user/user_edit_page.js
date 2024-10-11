import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { Helmet } from 'react-helmet';

import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { RequestStatus } from '../../constants';
import { endLoader } from '../../features/main';
import { getUserById } from '../../features/user/userSlice';
import Breadcrumb from '../../components/Breadcrumb';
import { Routes } from '../../routes';
import UserForm from '../../components/User/UserForm';
import { Col, Row } from 'react-bootstrap';

const UserEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, user, userGetStatus, progress } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById({ id }));
  }, [dispatch, id]);

  return (
    <Row>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      {userGetStatus === RequestStatus.Success && user && (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{user.attributes.name}</title>
          </Helmet>
          <Breadcrumb
            pageTitle={user.attributes.name}
            items={[
              {
                title: 'Users Management',
                active: false,
                link: Routes.Users.path,
              },
              {
                title: user.attributes.name,
                active: true,
                link: '#',
              },
            ]}
          />
        </>
      )}
      <Col md={12}>
        <div className="mt-3">{userGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}</div>
        {userGetStatus === RequestStatus.Success && <UserForm user={user} />}
      </Col>
    </Row>
  );
};

export default UserEditPage;
