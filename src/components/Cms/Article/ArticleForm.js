import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccessAlert';
import SelectField from '../../Forms/SelectField';
import ValidationError from '../../Errors/ValidationError';

import { RequestStatus } from '../../../constants';
import { createArticle, getEditArticle, updateArticle } from '../../../features/article/articleSlice';
import { getChapters } from '../../../features/chapter/chapterSlice';

import LoadingSpinner from '../../LoadingSpinner';
import { Routes } from '../../../routes';
import { Link } from 'react-router-dom';
import ArticleTranslationForm from './ArticleTranslationForm';

const ArticleForm = (props) => {
  const { article } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    chapter_id: Yup.string().required(t('articleForm.errors.chapterIsRequired')),
    order: Yup.number(),
    translations: Yup.array()
      .of(
        Yup.object().shape({
          locale: Yup.string().required(t('articleForm.errors.localeIsRequired')),
          title: Yup.string().required(t('articleForm.errors.titleIsRequired')),
          number: Yup.string().required(t('articleForm.errors.numberIsRequired')),
          content: Yup.string().required(t('articleForm.errors.descriptionIsRequired')),
        })
      )
      .nullable(),
  });

  const { error, validationErrors, success, articleCreateStatus, articlePatchStatus } = useSelector(
    (state) => state.article
  );
  const { chapters, chaptersGetStatus } = useSelector((state) => state.chapter);

  useEffect(() => {
    dispatch(getChapters());
  }, [dispatch]);

  articleCreateStatus === RequestStatus.Success &&
    setTimeout(() => {
      dispatch(getEditArticle(article.id));
      window.location.reload();
    }, 1500);

  articlePatchStatus === RequestStatus.Success &&
    setTimeout(() => {
      dispatch(getEditArticle(article.id));
      window.location.reload();
    }, 1500);

  return (
    <>
      <div className="mt-3">
        {articleCreateStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {articleCreateStatus === RequestStatus.Success && <SuccessAlert message={success} />}

        {articlePatchStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {articlePatchStatus === RequestStatus.Success && <SuccessAlert message={success} />}
        {validationErrors && <ValidationError errors={validationErrors} />}
      </div>
      <Card>
        <Card.Body>
          {article ? (
            <Formik
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append('_method', 'PATCH');
                formData.append('formData', JSON.stringify(values));
                try {
                  dispatch(updateArticle({ id: article.id, formData }));
                } catch (err) {
                  console.log(err.message);
                }
              }}
              initialValues={{
                order: article.order,
                chapter_id: article.chapter_id,
                translations: article.translations.map((translation) => ({
                  id: translation.id,
                  locale: translation.locale,
                  title: translation.title,
                  content: translation.content,
                  number: translation.number,
                  order: translation.order,
                })),
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} noValidate>
                  <div className="d-flex justify-content-center align-self-center flex-column">
                    <Form.Group id="chapterInputGroup" className="mb-3 position-relative">
                      <Form.Label htmlFor="chapter">{t('chapter')}</Form.Label>
                      <SelectField
                        id="chapter"
                        name="chapter_id"
                        data={chapters.map((v) => ({ value: v.id, label: v.translations[0].title }))}
                        value={values.chapter_id}
                        placeholder={values.chapter_id}
                        field={`chapter_id`}
                        onChange={setFieldValue}
                      />
                    </Form.Group>
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
                      <ArticleTranslationForm values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <Button variant="warning" as={Link} to={Routes.Articles.path}>
                      {t('back')}
                    </Button>{' '}
                    <Button variant="secondary" as={Link} to={`/articles/${article.id}`}>
                      {t('view')}
                    </Button>{' '}
                    <Button variant="primary" type="submit" disabled={articlePatchStatus === RequestStatus.Getting}>
                      {articlePatchStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('saveChange')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append('formData', JSON.stringify(values));
                dispatch(createArticle(formData));
              }}
              initialValues={{
                chapter_id: '',
                order: 1,
                translations: [
                  {
                    locale: 'en',
                    title: '',
                    number: '',
                    content: '',
                  },
                ],
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} noValidate>
                  <div className="d-flex justify-content-center align-self-center flex-column">
                    <Form.Group id="chapterInputGroup" className="mb-3 position-relative">
                      <Form.Label htmlFor="chapter">{t('chapter')}</Form.Label>
                      <SelectField
                        id="chapter"
                        name="chapter_id"
                        data={chapters.map((b) => ({ value: b.id, label: b.translations[0].title }))}
                        value={values.chapter_id}
                        placeholder={
                          chaptersGetStatus === RequestStatus.Getting ? (
                            <LoadingSpinner />
                          ) : (
                            t('articleForm.selectChapter')
                          )
                        }
                        field={`chapter_id`}
                        onChange={setFieldValue}
                      />
                    </Form.Group>
                    <Form.Group id="translations" className="mb-3 position-relative">
                      <ArticleTranslationForm values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <Button variant="warning" as={Link} to={Routes.Articles.path}>
                      {t('back')}
                    </Button>{' '}
                    <Button variant="primary" type="submit" disabled={articleCreateStatus === RequestStatus.Getting}>
                      {articleCreateStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('save')}
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

export default ArticleForm;
