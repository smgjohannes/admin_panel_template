import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from '../../components/Breadcrumb';
import { Routes } from '../../routes';
import UsersTable from '../../components/User/UsersTable';

const UsersPage = () => {
  return (
    <>
      <Breadcrumb
        pageTitle={'Users Management'}
        items={[
          {
            title: 'System Users',
            active: true,
            link: '#',
          },
        ]}
      >
        <Button as={Link} to={Routes.UserNew.path}>
          <FontAwesomeIcon icon={faPlus} /> New User
        </Button>
      </Breadcrumb>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Users Management</title>
        <link rel="canonical" href={window.location.url} />
      </Helmet>
      <UsersTable />
    </>
  );
};

export default UsersPage;
