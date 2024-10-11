import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccessAlert';
import ValidationError from '../../Errors/ValidationError';
import LoadingSpinner from '../../LoadingSpinner';

import { RequestStatus } from '../../../constants';
import { createChapter, getEditChapter, saveChapter } from '../../../features/chapter/chapterSlice';
import ChapterTranslationForm from './ChapterTranslationForm';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';

const ChapterForm = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    order: Yup.number(),
    translations: Yup.array()
      .of(
        Yup.object().shape({
          locale: Yup.string().required(t('chapterForm.errors.localeIsRequired')),
          title: Yup.string().required(t('chapterForm.errors.titleIsRequired')),
          number: Yup.string().required(t('chapterForm.errors.numberIsRequired')),
          description: Yup.string(),
        })
      )
      .nullable(),
  });
  const { chapter } = props;
  const { error, validationErrors, success, chapterCreateStatus, chapterPatchStatus } = useSelector(
    (state) => state.chapter
  );

  chapterCreateStatus === RequestStatus.Success &&
    setTimeout(() => {
      dispatch(getEditChapter(chapter.id));
      window.location.reload();
    }, 1500);

  chapterPatchStatus === RequestStatus.Success &&
    setTimeout(() => {
      dispatch(getEditChapter(chapter.id));
      window.location.reload();
    }, 1500);

  return (
    <>
      <div className="mt-3">
        {chapterCreateStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {chapterCreateStatus === RequestStatus.Success && <SuccessAlert message={success} />}

        {chapterPatchStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {chapterPatchStatus === RequestStatus.Success && <SuccessAlert message={success} />}

        {validationErrors && <ValidationError errors={validationErrors} />}
      </div>
      <Card>
        <Card.Body>
          {chapter ? (
            <Formik
              validationSchema={validationSchema}
              onSubmit={async (values, { isSubmitting }) => {
                const formData = new FormData();
                formData.append('_method', 'PUT');
                formData.append('formData', JSON.stringify(values));
                try {
                  dispatch(saveChapter({ id: chapter.id, formData }));
                } catch (err) {
                  console.log(err.message);
                }
              }}
              initialValues={{
                order: chapter.order,
                translations: chapter.translations.map((translation) => ({
                  locale: translation.locale,
                  title: translation.title,
                  number: translation.number,
                  description: translation.description,
                })),
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} noValidate method="post" encType="multipart/form-data">
                  <div className="d-flex justify-content-center align-self-center flex-column">
                    <Form.Group id="orderInput" className="mb-3 position-relative">
                      <Form.Label htmlFor="order">{t('displayOrder')}</Form.Label>
                      <Form.Control
                        id="order"
                        value={values.order}
                        type="number"
                        name="order"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                    <Form.Group id="translations" className="mb-3 position-relative">
                      <ChapterTranslationForm values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <Button variant="warning" as={Link} to={Routes.Chapters.path}>
                      {t('cancel')}
                    </Button>{' '}
                    <Button variant="secondary" as={Link} to={`/chapters/${chapter.id}`}>
                      {t('view')}
                    </Button>{' '}
                    <Button variant="primary" type="submit" disabled={chapterPatchStatus === RequestStatus.Getting}>
                      {chapterPatchStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('saveChange')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              validationSchema={validationSchema}
              onSubmit={async (values, { isSubmitting }) => {
                const formData = new FormData();
                formData.append('formData', JSON.stringify(values));
                try {
                  dispatch(createChapter(formData));
                  isSubmitting(false);
                } catch (err) {
                  console.log(err.message);
                }
              }}
              initialValues={{
                order: 1,
                translations: [
                  {
                    locale: 'en',
                    title: '',
                    number: '',
                  },
                ],
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} noValidate method="post" encType="multipart/form-data">
                  <div className="d-flex justify-content-center align-self-center flex-column">
                    <Form.Group id="orderInput" className="mb-3 position-relative">
                      <Form.Label htmlFor="order">{t('displayOrder')}</Form.Label>
                      <Form.Control
                        id="order"
                        value={values.order}
                        type="number"
                        name="order"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                    <Form.Group id="translations" className="mb-3 position-relative">
                      <ChapterTranslationForm values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <Button variant="warning" as={Link} to={Routes.Chapters.path}>
                      {t('cancel')}
                    </Button>{' '}
                    <Button variant="primary" type="submit" disabled={chapterCreateStatus === RequestStatus.Getting}>
                      {chapterCreateStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('save')}
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

export default ChapterForm;
