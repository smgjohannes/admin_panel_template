import React from 'react';
import { Helmet } from 'react-helmet';
import { Col, Row } from 'react-bootstrap';

import Breadcrumb from '../../components/Breadcrumb';
import { Routes } from '../../routes';
import UserForm from '../../components/User/UserForm';

const UserNewPage = () => {
  return (
    <Row>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{'User Management'}</title>
      </Helmet>
      <Breadcrumb
        pageTitle={'User Management'}
        items={[
          {
            title: 'Users Management',
            active: false,
            link: Routes.Users.path,
          },
          {
            title: 'New User',
            active: true,
            link: '#',
          },
        ]}
      />
      <Col md={12}>
        <UserForm />
      </Col>
    </Row>
  );
};

export default UserNewPage;
