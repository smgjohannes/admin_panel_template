import React from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { Editor } from '@tinymce/tinymce-react';

import ErrorMessage from '../../Forms/ErrorMessage';
import { tynimce } from '../../../config/tinymce';
import SelectField from '../../Forms/SelectField';
import { languages } from '../../../constants';
import { useTranslation } from 'react-i18next';

const { REACT_APP_TYNIMCE_KEY } = process.env;

const ArticleTranslationForm = ({ ...props }) => {
  const { handleBlur, values, setFieldValue } = props;
  const { t } = useTranslation();

  return (
    <FieldArray name="translations">
      {({ remove, push }) => (
        <Card>
          <Card.Header>
            <Card.Title>{t('fields')}</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              {values.translations.length > 0 &&
                values.translations.map((translation, index) => (
                  <Row className="mb-3" key={index}>
                    <Form.Group
                      as={Col}
                      md={12}
                      id={`translations.${index}.localeField`}
                      className="mb-3 position-relative"
                      key={`translations-${index}.locale`}
                    >
                      <Form.Label htmlFor={`translations.${index}.locale`}>{t('articlesPage.language')}</Form.Label>
                      <SelectField
                        id={`translations.${index}.locale`}
                        name={`translations.${index}.locale`}
                        data={languages.map((b) => ({ value: b.value, label: b.label }))}
                        value={translation.locale}
                        placeholder={translation.locale}
                        field={`translations.${index}.locale`}
                        onChange={setFieldValue}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={12}
                      id={`translations.${index}.title`}
                      className="mb-3 position-relative"
                      key={`translations-${index}.title`}
                    >
                      <Form.Label htmlFor={`translations.${index}.title`}>{t('title')}</Form.Label>
                      <Form.Control
                        id={`translations.${index}.title`}
                        value={translation.title}
                        type="text"
                        name={`translations.${index}.title`}
                        onChange={(e) => {
                          setFieldValue(`translations.${index}.title`, e.target.value);
                        }}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name={`translations.${index}.title`}>
                        {(msg) => {
                          <Form.Control.Feedback type="invalid" tooltip>
                            {msg}
                          </Form.Control.Feedback>;
                        }}
                      </ErrorMessage>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={12}
                      id={`translations.${index}.number`}
                      className="mb-3 position-relative"
                      key={`translations-${index}.number`}
                    >
                      <Form.Label htmlFor={`translations-${index}.number`}>{t('articleForm.number')} #</Form.Label>
                      <Form.Control
                        id={`translations.${index}.number`}
                        value={translation.number}
                        type="text"
                        name={`translations.${index}.number`}
                        onChange={(e) => {
                          setFieldValue(`translations.${index}.number`, e.target.value);
                        }}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name={`translations.${index}.number`}>
                        {(msg) => {
                          <Form.Control.Feedback type="invalid" tooltip>
                            {msg}
                          </Form.Control.Feedback>;
                        }}
                      </ErrorMessage>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={12}
                      id={`translations-${index}.contentField`}
                      className="mb-3 position-relative"
                      key={`translations-${index}.content`}
                    >
                      <Form.Label htmlFor={`translations.${index}.content`}>{t('description')}</Form.Label>
                      <Editor
                        apiKey={REACT_APP_TYNIMCE_KEY}
                        textareaName={`translations.${index}.content`}
                        value={translation.content}
                        onBlur={handleBlur}
                        onEditorChange={(e) => {
                          setFieldValue(`translations.${index}.content`, e);
                        }}
                        init={tynimce}
                      />
                      <ErrorMessage name={`translations.${index}.content`}>
                        {(msg) => {
                          <Form.Control.Feedback type="invalid" tooltip>
                            {msg}
                          </Form.Control.Feedback>;
                        }}
                      </ErrorMessage>
                    </Form.Group>
                    <Form.Group as={Col} md={12} className="position-relative mb-3">
                      <Form.Control type="hidden" name={`translations.${index}.id`} value={translation.id} />
                      <Button variant="danger" onClick={() => remove(index)} size="sm" className="mb-3 mt-3">
                        <FontAwesomeIcon icon={faRemove} /> {t('remove')}
                      </Button>
                    </Form.Group>
                  </Row>
                ))}
            </div>
            <Button
              variant="info"
              onClick={() => push({ locale: '', title: '', number: '', content: '' })}
              size="sm"
              className="mb-3"
            >
              {t('addField')}
            </Button>
          </Card.Body>
        </Card>
      )}
    </FieldArray>
  );
};

export default ArticleTranslationForm;
