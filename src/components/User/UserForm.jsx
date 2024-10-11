import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ErrorAlert from '../Alerts/ErrorAlert';
import ValidationError from '../Errors/ValidationError';
import SuccessAlert from '../Alerts/SuccessAlert';
import LoadingSpinner from '../LoadingSpinner';

import { endLoader } from '../../features/main';
import { RequestStatus } from '../../constants';
import { updateUser, createUser } from '../../features/user/userSlice';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserForm = (props) => {
  const { user } = props;
  const { error, validationErrors, success, progress, userPatchStatus, userCreateStatus } = useSelector(
    (state) => state.user
  );
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  userPatchStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  userCreateStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      <div>
        {userPatchStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {userPatchStatus === RequestStatus.Success && <SuccessAlert message={success} />}

        {userCreateStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {userCreateStatus === RequestStatus.Success && <SuccessAlert message={success} />}

        {validationErrors && <ValidationError errors={validationErrors} />}
      </div>
      {user ? (
        <Formik
          validationSchema={Yup.object().shape({
            name: Yup.string().required(t('userForm.error.nameRequired')),
            phone: Yup.number().required(t('userForm.error.phoneRequired')),
            email: Yup.string()
              .email()
              .required(t(t('userForm.error.emailRequired'))),
          })}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append('_method', 'PATCH');
            if (avatar) {
              formData.append('avatar', avatar);
            }
            formData.append('formData', JSON.stringify(values));

            try {
              dispatch(updateUser({ id: user.id, formData }));
            } catch (err) {
              console.log(err.message);
            }
          }}
          initialValues={{
            name: user.name,
            phone: user.phone,
            email: user.email,
            password: '',
            password_confirmation: '',
          }}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Card>
                <Card.Body>
                  <Form.Group as={Row}>
                    <Form.Group as={Col} md={8}>
                      <Form.Group id="nameInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="name">{t('userForm.name')}</Form.Label>
                        <Form.Control
                          id="name"
                          value={values.name}
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.name}
                        />
                        {errors.name && touched.name ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.name}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group id="emailInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="email">{t('userForm.email')}</Form.Label>
                        <Form.Control
                          id="email"
                          value={values.email}
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.email}
                        />
                        {errors.email && touched.email ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.email}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group id="emailInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="phone">{t('userForm.phone')}</Form.Label>
                        <Form.Control
                          id="phone"
                          value={values.phone}
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.phone}
                        />
                        {errors.phone && touched.phone ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.phone}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                      <Form.Group id="passwordInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="password">{t('userForm.password')}</Form.Label>
                        <Form.Control
                          id="password"
                          value={values.password}
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.password}
                        />
                        {errors.password && touched.password ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.password}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group id="passwordRepeatInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="passwordRepeat">{t('userForm.passwordConfirmation')}</Form.Label>
                        <Form.Control
                          id="passwordRepeat"
                          value={values.password_confirmation}
                          type="password"
                          name="password_confirmation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.password_confirmation}
                        />
                        {errors.password_confirmation && touched.password_confirmation ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.password_confirmation}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} md={8}>
                      <Form.Group id="avatarField" className="position-relative mb-3">
                        <Form.Label htmlFor="avatar">{t('userForm.avatar')}</Form.Label>
                        <Form.Control
                          id="avatar"
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={(event) => {
                            setAvatar(event.currentTarget.files[0]);
                          }}
                        />
                      </Form.Group>
                      <div className="mt-3">
                        <Button variant="primary" type="submit" disabled={userPatchStatus === RequestStatus.Getting}>
                          {userPatchStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('saveChange')}
                        </Button>
                      </div>
                    </Form.Group>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          onSubmit={async (values) => {
            const formData = new FormData();
            if (avatar) {
              formData.append('avatar', values.avatar);
            }
            formData.append('formData', JSON.stringify(values));
            try {
              dispatch(createUser(formData));
            } catch (err) {
              console.log(err.message);
            }
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(t('userForm.error.nameRequired')),
            phone: Yup.number().required(t('userForm.error.phoneRequired')),
            email: Yup.string().email().required(t('userForm.error.emailRequired')),
            password: Yup.string()
              .required(t('userForm.error.passwordRequired'))
              .min(8, t('userForm.error.passwordMinErr'))
              .matches(/[a-zA-Z]/, t('userForm.error.PasswordCharacterErr')),
            password_confirmation: Yup.string().oneOf(
              [Yup.ref('password'), null],
              t('userForm.error.passwordMatchErr')
            ),
          })}
          initialValues={{
            name: '',
            phone: '',
            email: '',
            password: '',
            password_confirmation: '',
          }}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Card>
                <Card.Body>
                  <Form.Group as={Row}>
                    <Form.Group as={Col} md={8}>
                      <Form.Group id="nameInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="name">{t('userForm.name')}</Form.Label>
                        <Form.Control
                          id="name"
                          value={values.name}
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.name}
                        />
                        {errors.name && touched.name ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.name}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group id="emailInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="email">{t('userForm.email')}</Form.Label>
                        <Form.Control
                          id="email"
                          value={values.email}
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.email}
                        />
                        {errors.email && touched.email ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.email}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group id="emailInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="phone">{t('userForm.phone')}</Form.Label>
                        <Form.Control
                          id="phone"
                          value={values.phone}
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.phone}
                        />
                        {errors.phone && touched.phone ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.phone}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                      <Form.Group id="passwordInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="password">{t('userForm.password')}</Form.Label>
                        <Form.Control
                          id="password"
                          value={values.password}
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.password}
                        />
                        {errors.password && touched.password ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.password}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                      <Form.Group id="passwordRepeatInput" className="mb-3 position-relative">
                        <Form.Label htmlFor="passwordRepeat">{t('userForm.passwordConfirmation')}</Form.Label>
                        <Form.Control
                          id="passwordRepeat"
                          value={values.password_confirmation}
                          type="password"
                          name="password_confirmation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.password_confirmation}
                        />
                        {errors.password_confirmation && touched.password_confirmation ? (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {errors.password_confirmation}
                          </Form.Control.Feedback>
                        ) : null}
                      </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} md={8}>
                      <Form.Group id="avatarField" className="position-relative mb-3">
                        <Form.Label htmlFor="avatar">{t('userForm.avatar')}</Form.Label>
                        <Form.Control
                          id="avatar"
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={(event) => {
                            setAvatar(event.currentTarget.files[0]);
                          }}
                        />
                      </Form.Group>
                      <div className="mt-3">
                        <Button variant="primary" type="submit" disabled={userCreateStatus === RequestStatus.Getting}>
                          {userCreateStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('save')}
                        </Button>
                      </div>
                    </Form.Group>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default UserForm;
