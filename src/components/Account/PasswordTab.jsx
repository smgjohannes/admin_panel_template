import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faUnlockAlt, faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Card, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { RequestStatus } from '../../constants';
import { saveUser } from '../../features/user/userSlice';
import LoadingSpinner from '../LoadingSpinner';
import { useTranslation } from 'react-i18next';

const PasswordTab = () => {
  const { t } = useTranslation();
  const { userPatchStatus } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [edit, setEdit] = useState(false);

  const handleChangeMode = () => {
    setEdit(!edit);
  };

  userPatchStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{t('accountPassword')}</h5>
        <Row>
          <Col xs={12} xl={8}>
            <Formik
              onSubmit={async (values, { actions }) => {
                try {
                  actions.setSubmitting(true);
                  dispatch(saveUser(JSON.stringify(values, null, 2)));
                  actions.setSubmitting(false);
                } catch (err) {
                  console.error(err.message);
                }
              }}
              validationSchema={Yup.object().shape({
                current_password: Yup.string().min(6).required(t('formError.currentPasswordIsRequired')),
                password: Yup.string()
                  .min(6)
                  .when('current_password', (current_password, field) =>
                    current_password ? field.required(t('formError.passwordIsRequired')) : field
                  ),
                password_confirmation: Yup.string().when('password', (password, field) =>
                  password ? field.required().oneOf([Yup.ref('password')], t('formError.passwordDoNotMatch')) : field
                ),
              })}
              initialValues={{
                current_password: '',
                password: '',
                password_confirmation: '',
              }}
            >
              {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                      <h5 className="mb-4">{t('changePassword')}</h5>
                      <Form.Group as={Row}>
                        <Form.Group id="currentPasswordGroup" as={Col} md={12} className="mb-3 position-relative">
                          <Form.Label htmlFor="currentPasswordField">{t('currentPassword')}</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              id="currentPasswordField"
                              value={values.current_password}
                              type={showPassword ? 'text' : 'password'}
                              name="current_password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              isInvalid={touched.current_password && errors.current_password}
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
                          {errors.current_password && touched.current_password ? (
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.current_password}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>

                        <Form.Group id="newPasswordPasswordGroup" as={Col} md={12} className="mb-3 position-relative">
                          <Form.Label htmlFor="newPasswordField">{t('newPassword')}</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              id="newPasswordField"
                              value={values.password}
                              type={showPassword ? 'text' : 'password'}
                              name="password"
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

                        <Form.Group id="repeatNewPasswordGroup" as={Col} md={12} className="mb-3 position-relative">
                          <Form.Label htmlFor="repeatNewPasswordField">{t('confirmNewPassword')}</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              id="repeatNewPasswordField"
                              value={values.password_confirmation}
                              type={showPassword ? 'text' : 'password'}
                              name="password_confirmation"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              isInvalid={touched.password_confirmation && errors.password_confirmation}
                            />
                          </InputGroup>
                          {errors.password_confirmation && touched.password_confirmation ? (
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.password_confirmation}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Form.Group>
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
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PasswordTab;
