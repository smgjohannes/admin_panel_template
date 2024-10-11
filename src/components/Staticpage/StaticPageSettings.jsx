import React from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../Forms/ErrorMessage';
import { useTranslation } from 'react-i18next';

const StaticPageSettings = ({ ...props }) => {
  const { handleBlur, values, setFieldValue } = props;
  const { t } = useTranslation();

  return (
    <FieldArray name="settings">
      {({ remove, push }) => (
        <Card>
          <Card.Header>
            <Card.Title>{t('Page Settings')}</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              {values.settings.length > 0 &&
                values.settings.map((setting, index) => (
                  <Row className="mb-3" key={index}>
                    <Form.Group
                      as={Col}
                      md={4}
                      id={`settings.${index}.settingKey`}
                      className="mb-3 position-relative"
                      key={`settings-${index}.settingKey`}
                    >
                      <Form.Label htmlFor={`settings.${index}.settingKey`}>{t('Setting Key')}</Form.Label>
                      <Form.Control
                        id={`settings.${index}.settingKey`}
                        value={setting.settingKey}
                        type="text"
                        name={`settings.${index}.settingKey`}
                        onChange={(e) => setFieldValue(`settings.${index}.settingKey`, e.target.value)}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage name={`settings.${index}.settingKey`}>
                        {(msg) => (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {msg}
                          </Form.Control.Feedback>
                        )}
                      </ErrorMessage>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md={4}
                      id={`settings.${index}.fieldType`}
                      className="mb-3 position-relative"
                      key={`settings-${index}.fieldType`}
                    >
                      <Form.Label htmlFor={`settings.${index}.fieldType`}>{t('Field Type')}</Form.Label>
                      <Form.Control
                        as="select"
                        name={`settings.${index}.fieldType`}
                        value={setting.fieldType}
                        onChange={(e) => setFieldValue(`settings.${index}.fieldType`, e.target.value)}
                        onBlur={handleBlur}
                      >
                        <option value="text">{t('Text')}</option>
                        <option value="number">{t('Number')}</option>
                        <option value="checkbox">{t('Checkbox')}</option>
                      </Form.Control>
                      <ErrorMessage name={`settings.${index}.fieldType`}>
                        {(msg) => (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {msg}
                          </Form.Control.Feedback>
                        )}
                      </ErrorMessage>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md={4}
                      id={`settings.${index}.settingValue`}
                      className="mb-3 position-relative"
                      key={`settings-${index}.settingValue`}
                    >
                      <Form.Label htmlFor={`settings.${index}.settingValue`}>{t('Setting Value')}</Form.Label>
                      {setting.fieldType === 'text' && (
                        <Form.Control
                          id={`settings.${index}.settingValue`}
                          value={setting.settingValue}
                          type="text"
                          name={`settings.${index}.settingValue`}
                          onChange={(e) => setFieldValue(`settings.${index}.settingValue`, e.target.value)}
                          onBlur={handleBlur}
                        />
                      )}
                      {setting.fieldType === 'number' && (
                        <Form.Control
                          id={`settings.${index}.settingValue`}
                          value={setting.settingValue}
                          type="number"
                          name={`settings.${index}.settingValue`}
                          onChange={(e) => setFieldValue(`settings.${index}.settingValue`, e.target.value)}
                          onBlur={handleBlur}
                        />
                      )}
                      {setting.fieldType === 'checkbox' && (
                        <Form.Check
                          id={`settings.${index}.settingValue`}
                          checked={setting.settingValue}
                          type="checkbox"
                          name={`settings.${index}.settingValue`}
                          onChange={(e) => setFieldValue(`settings.${index}.settingValue`, e.target.checked)}
                          onBlur={handleBlur}
                        />
                      )}
                      <ErrorMessage name={`settings.${index}.settingValue`}>
                        {(msg) => (
                          <Form.Control.Feedback type="invalid" tooltip>
                            {msg}
                          </Form.Control.Feedback>
                        )}
                      </ErrorMessage>
                    </Form.Group>
                    <Form.Group as={Col} md={12} className="position-relative mb-3">
                      <Form.Control type="hidden" name={`settings.${index}.id`} value={setting.id} />
                      <Button variant="danger" onClick={() => remove(index)} size="sm" className="mb-3 mt-3">
                        <FontAwesomeIcon icon={faRemove} /> {t('Remove')}
                      </Button>
                    </Form.Group>
                  </Row>
                ))}
            </div>
            <Button
              variant="info"
              onClick={() => push({ settingKey: '', settingValue: '', fieldType: 'text' })}
              size="sm"
              className="mb-3"
            >
              {t('Add Setting')}
            </Button>
          </Card.Body>
        </Card>
      )}
    </FieldArray>
  );
};

export default StaticPageSettings;
