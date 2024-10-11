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
import UserView from '../../components/User/UserView';

const UserViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, user, userGetStatus, progress } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserById({ id }));
  }, [dispatch, id]);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      {userGetStatus === RequestStatus.Success && user && (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{user.attributes.title}</title>
          </Helmet>
          <Breadcrumb
            pageTitle={user.attributes.title}
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
      <div className="mt-3">{userGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}</div>
      {userGetStatus === RequestStatus.Success && <UserView user={user} />}
    </>
  );
};

export default UserViewPage;
