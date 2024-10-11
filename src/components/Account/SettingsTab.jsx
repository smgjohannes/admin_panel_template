import React from 'react';
import { Form, Col, Row, Card, Button } from 'react-bootstrap';

import { Formik } from 'formik';
import * as Yup from 'yup';

import LoadingSpinner from '../LoadingSpinner';
import SelectField from '../Forms/SelectField';
import { languages } from '../../constants';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { normalizeLanguageCode } from '../../utils/common';

const SettingsTab = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    localStorage.setItem('X-LOCALE', lng);
    console.log(localStorage.getItem('X-LOCALE'));
    setCurrentLanguage(lng);
    i18n.changeLanguage(lng);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{t('accountSettings')}</h5>
        <Row>
          <Col xs={12} xl={8}>
            <Formik
              onSubmit={async (values, { actions }) => {
                try {
                  changeLanguage(values.language);
                } catch (err) {
                  console.error(err.message);
                }
              }}
              validationSchema={Yup.object().shape({
                language: Yup.string().required(t('formError.languageIsRequired')),
              })}
              initialValues={{
                language: normalizeLanguageCode(currentLanguage),
              }}
            >
              {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <Card border="light" className="bg-white shadow-sm mb-4">
                    <Card.Body>
                      <h5 className="mb-4">{t('changeLanguage')}</h5>
                      <Form.Group as={Row}>
                        <Form.Group id="languageInput" as={Col} md={6} className="mb-3">
                          <Form.Label htmlFor="language">{t('language')}</Form.Label>
                          <SelectField
                            id="language"
                            name="language"
                            data={languages}
                            value={values.language}
                            placeholder={values.language}
                            field={`language`}
                            onChange={setFieldValue}
                          />
                          {errors.language && touched.language ? (
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.language}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Form.Group>
                      <div className="mt-3">
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? <LoadingSpinner /> : t('saveChange')}
                        </Button>
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

export default SettingsTab;
