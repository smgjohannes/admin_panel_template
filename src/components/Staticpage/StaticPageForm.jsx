import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ErrorAlert from '../Alerts/ErrorAlert';
import SuccessAlert from '../Alerts/SuccessAlert';
import ValidationError from '../Errors/ValidationError';
import LoadingSpinner from '../LoadingSpinner';

import { RequestStatus } from '../../constants';
import { createPage, getEditPage, savePage } from '../../features/staticpage/staticpageSlice';
import StaticPageTranslationForm from './StaticPageTranslationForm';
import SettingsForm from './StaticPageSettings';
import { useTranslation } from 'react-i18next';

const StaticPageForm = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { page } = props;
  const { error, validationErrors, success, pageCreateStatus, pagePatchStatus } = useSelector((state) => state.page);
  const [thumbnail, setThumbnail] = useState(null);

  pageCreateStatus === RequestStatus.Success &&
    setTimeout(() => {
      dispatch(getEditPage(page.id));
      window.location.reload();
    }, 1500);

  pagePatchStatus === RequestStatus.Success &&
    setTimeout(() => {
      dispatch(getEditPage(page.id));
      window.location.reload();
    }, 1500);

  return (
    <>
      <div className="mt-3">
        {pageCreateStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {pageCreateStatus === RequestStatus.Success && <SuccessAlert message={success} />}

        {pagePatchStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {pagePatchStatus === RequestStatus.Success && <SuccessAlert message={success} />}
        {validationErrors && <ValidationError errors={validationErrors} />}
      </div>
      <Card>
        <Card.Body>
          {page ? (
            <Formik
              validationSchema={Yup.object().shape({
                active: Yup.boolean(),
                translations: Yup.array()
                  .of(
                    Yup.object().shape({
                      locale: Yup.string().required('Required'),
                      title: Yup.string().required('Required'),
                      description: Yup.string().required('Required'),
                    })
                  )
                  .nullable(),
                settings: Yup.array()
                  .of(
                    Yup.object().shape({
                      settingKey: Yup.string().required('Required'),
                      settingValue: Yup.mixed().required('Required'),
                      fieldType: Yup.string().required('Required'),
                    })
                  )
                  .nullable(),
              })}
              onSubmit={async (values, { isSubmitting }) => {
                const formData = new FormData();
                formData.append('_method', 'PATCH');
                if (thumbnail) {
                  formData.append('thumbnail', thumbnail);
                }
                formData.append('formData', JSON.stringify(values));
                try {
                  dispatch(savePage({ id: page.id, formData }));
                  isSubmitting(false);
                } catch (err) {
                  console.log(err.message);
                }
              }}
              initialValues={{
                active: page.active,
                translations: page.translations.map((translation) => ({
                  id: translation.id,
                  locale: translation.locale,
                  title: translation.title,
                  description: translation.description,
                })),
                settings: page.settings || [],
              }}
            >
              {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} noValidate method="post" encType="multipart/form-data">
                  <input type="hidden" name="_method" value="PUT" />
                  <div className="d-flex justify-content-center align-self-center flex-column">
                    <Form.Group id="statusInput" className="mb-3 position-relative">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>{t('staticPageForm.status')}</InputGroup.Text>
                        <InputGroup.Checkbox
                          aria-label={t('.staticPageForm.status')}
                          id="active"
                          name="active"
                          value={values.active}
                          defaultChecked={values.active}
                          onChange={(e) => {
                            setFieldValue('active', e.target.checked);
                          }}
                          onBlur={handleBlur}
                        />
                        <Form.Control aria-label={t('staticPageForm.status')} readOnly />
                      </InputGroup>
                    </Form.Group>

                    {/* Translations */}
                    <Form.Group id="translations" className="mb-3 position-relative">
                      <StaticPageTranslationForm
                        values={values}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    </Form.Group>

                    {/* Page Settings */}
                    <Form.Group id="pageSettings" className="mb-3 position-relative">
                      <SettingsForm values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                    </Form.Group>

                    <Form.Group id="imageField" className="position-relative mb-3">
                      <Form.Label htmlFor="thumbnail">{t('staticPageForm.thumbnail')} </Form.Label>
                      <Form.Control
                        id="thumbnail"
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={(e) => {
                          setThumbnail(e.currentTarget.files[0]);
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <Button variant="primary" type="submit" disabled={pagePatchStatus === RequestStatus.Getting}>
                      {pagePatchStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('saveChange')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              validationSchema={Yup.object().shape({
                active: Yup.boolean(),
                translations: Yup.array().nullable(),
                settings: Yup.array().nullable(),
              })}
              onSubmit={async (values, { isSubmitting }) => {
                const formData = new FormData();
                if (thumbnail) {
                  formData.append('thumbnail', thumbnail);
                }
                formData.append('formData', JSON.stringify(values));

                try {
                  dispatch(createPage(formData));
                  isSubmitting(false);
                } catch (err) {
                  console.log(err.message);
                }
              }}
              initialValues={{
                active: false,
                translations: [
                  {
                    locale: 'en',
                    title: '',
                    description: '',
                  },
                ],
                settings: [],
              }}
            >
              {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} noValidate method="post" encType="multipart/form-data">
                  <div className="d-flex justify-content-center align-self-center flex-column">
                    <Form.Group id="activeInput" className="mb-3 position-relative">
                      <InputGroup className="mb-3">
                        <InputGroup.Text>{t('staticPageForm.status')}</InputGroup.Text>
                        <InputGroup.Checkbox
                          aria-label={t('.staticPageForm.status')}
                          id="active"
                          name="active"
                          value={values.active}
                          defaultChecked={values.active}
                          onChange={(e) => {
                            setFieldValue('active', e.target.checked);
                          }}
                          onBlur={handleBlur}
                        />
                        <Form.Control aria-label={t('staticPageForm.status')} readOnly />
                      </InputGroup>
                      {errors.active && touched.active ? (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.active}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>

                    {/* Translations */}
                    <Form.Group id="translations" className="mb-3 position-relative">
                      <StaticPageTranslationForm
                        values={values}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                      />
                    </Form.Group>

                    {/* Settings */}
                    <Form.Group id="pageSettings" className="mb-3 position-relative">
                      <SettingsForm values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                    </Form.Group>

                    <Form.Group id="imageField" className="position-relative mb-3">
                      <Form.Label htmlFor="thumbnail">{t('staticPageForm.thumbnail')} </Form.Label>
                      <Form.Control
                        id="thumbnail"
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={(e) => {
                          setThumbnail(e.currentTarget.files[0]);
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <Button variant="primary" type="submit" disabled={pageCreateStatus === RequestStatus.Getting}>
                      {pageCreateStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('save')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default StaticPageForm;
