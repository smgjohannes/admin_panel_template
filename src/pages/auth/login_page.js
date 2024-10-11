import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { faLock, faUnlockAlt, faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, Container, InputGroup, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoadingBar from 'react-top-loading-bar';

import ValidationError from '../../components/Errors/ValidationError';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { seo } from '../../utils/Seo';
import { login } from '../../features/auth/authSlice';
import { endLoader } from '../../features/main';
import { RequestStatus, LoginStatus } from '../../constants';

import { Routes } from '../../routes';
import AppLogo from '../../assets/img/app/logo.png';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { error, validationErrors, loginStatus, progress, token } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const user = token.getUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      navigate(Routes.Dashboard.path);
    }
  }, [navigate, user]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  seo({
    title: t('login.title'),
  });

  return (
    <main>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-600 upm-cms-page-top">
                <div className="d-flex justify-content-center align-items-md-center">
                  <Image src={AppLogo} fluid className="mb-4" />
                </div>
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">{t('siteName')}</h3>
                  <div className="mt-3">
                    {loginStatus === RequestStatus.Error && <ErrorAlert message={error} />}
                    {validationErrors && <ValidationError errors={validationErrors} />}
                  </div>
                </div>
                <Formik
                  onSubmit={async (values) => {
                    setTimeout(() => {
                      dispatch(login(values));
                    }, 400);
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().email().required(t('login.errors.emailIsRequired')),
                    password: Yup.string().required(t('login.errors.passwordIsRequired')),
                  })}
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                >
                  {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <Form autoComplete="off" className="mt-4" onSubmit={handleSubmit}>
                      <Form.Group id="email" className="mb-4 position-relative">
                        <Form.Label>{t('login.emailLabel')}</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faLock} />
                          </InputGroup.Text>
                          <Form.Control
                            id="email"
                            required
                            value={values.email}
                            type="email"
                            name="email"
                            placeholder={t('login.emailLabel')}
                            isInvalid={touched.email && errors.email}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        {errors.email && touched.email ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.email}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group>
                        <Form.Group id="password" className="mb-4 position-relative">
                          <Form.Label>{t('login.passwordLabel')}</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              id="password"
                              value={values.password}
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              placeholder={t('login.passwordLabel')}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              isInvalid={touched.password && errors.password}
                            />
                            {showPassword ? (
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faEyeLowVision} onClick={handleShowPassword} />
                              </InputGroup.Text>
                            ) : (
                              <InputGroup.Text>
                                <FontAwesomeIcon icon={faEye} onClick={handleShowPassword} />
                              </InputGroup.Text>
                            )}
                          </InputGroup>
                          {errors.password && touched.password ? (
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.password}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Form.Group>
                      <Row>
                        <Col md={12} className="mb-3">
                          <Button
                            variant="success"
                            type="submit"
                            className="w-100"
                            disabled={loginStatus === LoginStatus.Processing}
                          >
                            {loginStatus === LoginStatus.Processing
                              ? t('login.loginActivityText')
                              : t('login.buttonLabel')}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default LoginPage;
