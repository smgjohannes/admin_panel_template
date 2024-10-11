import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Col, Row, Card, Button, Nav, Tab } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { Formik } from 'formik';

import ErrorAlert from '../Alerts/ErrorAlert';
import SuccessAlert from '../Alerts/SuccessAlert';

import { endLoader } from '../../features/main';
import { getMySelf, saveUser } from '../../features/user/userSlice';

import LoadingSpinner from '../LoadingSpinner';
import PasswordFormTab from './PasswordTab';
import SettingsTab from './SettingsTab';
import { RequestStatus } from '../../constants';
import { useTranslation } from 'react-i18next';

const AccountView = () => {
  const { token, error, progress, userPatchStatus } = useSelector((state) => state.user);
  const user = token.getUser();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [edit, setEdit] = useState(false);

  const handleChangeMode = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    dispatch(getMySelf());
  }, [dispatch]);

  userPatchStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      <div className="mt-3">
        {userPatchStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {userPatchStatus === RequestStatus.Success && <SuccessAlert message={t('formSuccess.accountUpdated')} />}
      </div>
      <Tab.Container defaultActiveKey="accountTab">
        <Row>
          <Col lg={3}>
            <Nav fill variant="pills" className="flex-column vertical-tab">
              <Nav.Item>
                <Nav.Link eventKey="accountTab" className="mb-sm-3 mb-md-3">
                  {t('account.tabs.account')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="settingsTab" className="mb-sm-3 mb-md-3">
                  {t('account.tabs.settings')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="passwordTab" className="mb-sm-3 mb-md-3">
                  {t('account.tabs.password')}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col lg={9}>
            <Tab.Content>
              <Tab.Pane eventKey="accountTab">
                <Formik
                  onSubmit={async (values, actions) => {
                    const formData = new FormData();
                    formData.append('_method', 'PATCH');
                    formData.append('formData', JSON.stringify(values));
                    try {
                      actions.setSubmitting(true);
                      dispatch(saveUser(formData));
                      actions.setSubmitting(false);
                    } catch (err) {
                      console.error(err.message);
                      actions.setSubmitting(false);
                    }
                  }}
                  initialValues={{
                    name: user.name,
                    phone: user.phone ? user.phone : '',
                  }}
                >
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                      <Form.Group as={Row}>
                        <Form.Group as={Col} xs={12} xl={8}>
                          <Card border="light" className="bg-white shadow-sm mb-4">
                            <Card.Body>
                              <h5 className="mb-4">{t('account.profile.title')}</h5>
                              <Row>
                                <Form.Group id="nameInput" as={Col} md={12} className="mb-3">
                                  <Form.Label htmlFor="name">{t('account.profile.name')}</Form.Label>
                                  {edit ? (
                                    <Form.Control
                                      id="name"
                                      value={values.name}
                                      type="text"
                                      name="name"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    />
                                  ) : (
                                    <Form.Control
                                      id="name"
                                      value={values.name}
                                      type="text"
                                      name="name"
                                      readOnly
                                      disabled
                                    />
                                  )}
                                  {errors.name && touched.name ? (
                                    <Form.Control.Feedback type="invalid" tooltip>
                                      {errors.name}
                                    </Form.Control.Feedback>
                                  ) : null}
                                </Form.Group>

                                <Form.Group id="phoneInput" as={Col} md={12} className="mb-3">
                                  <Form.Label htmlFor="phone">{t('account.profile.phone')}</Form.Label>
                                  {edit ? (
                                    <Form.Control
                                      id="phone"
                                      value={values.phone}
                                      type="text"
                                      name="phone"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    />
                                  ) : (
                                    <Form.Control
                                      id="phone"
                                      value={values.phone}
                                      type="text"
                                      name="phone"
                                      readOnly
                                      disabled
                                    />
                                  )}
                                </Form.Group>
                              </Row>
                              <div className="mt-3">
                                {edit ? (
                                  <>
                                    <Button variant="warning" onClick={handleChangeMode}>
                                      {t('cancel')}
                                    </Button>{' '}
                                    <Button
                                      variant="primary"
                                      type="submit"
                                      disabled={userPatchStatus === RequestStatus.Getting && edit}
                                    >
                                      {userPatchStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('saveChange')}
                                    </Button>
                                  </>
                                ) : (
                                  <Button variant="primary" onClick={handleChangeMode}>
                                    {t('edit')}
                                  </Button>
                                )}
                              </div>
                            </Card.Body>
                          </Card>
                        </Form.Group>
                      </Form.Group>
                    </Form>
                  )}
                </Formik>
              </Tab.Pane>
              <Tab.Pane eventKey="settingsTab">
                <SettingsTab user={user} />
              </Tab.Pane>
              <Tab.Pane eventKey="passwordTab">
                <PasswordFormTab user={user} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default AccountView;
