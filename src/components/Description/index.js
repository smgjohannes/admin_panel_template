import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { FieldArray } from 'formik';
import { Editor } from '@tinymce/tinymce-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

import ErrorMessage from '../Forms/ErrorMessage';
import { tynimce } from '../../config/tinymce';

const { REACT_APP_TYNIMCE_KEY } = process.env;

const Description = ({ ...props }) => {
  const { handleBlur, values, setFieldValue } = props;
  return (
    <>
      <FieldArray name="descriptions">
        {({ remove, push }) => (
          <>
            <Row className="mb-3">
              {values.descriptions.length > 0 &&
                values.descriptions.map((v, index) => (
                  <>
                    <Form.Group
                      as={Col}
                      md={12}
                      id={`descriptions-${index}.contentField`}
                      className="mb-3 position-relative"
                      key={`descriptions-${index}.content`}
                    >
                      <Form.Label htmlFor={`descriptions.${index}.content`}>Content</Form.Label>
                      <Editor
                        apiKey={REACT_APP_TYNIMCE_KEY}
                        textareaName={`descriptions.${index}.content`}
                        value={v.content}
                        onBlur={handleBlur}
                        onEditorChange={(e) => {
                          setFieldValue(`descriptions.${index}.content`, e);
                        }}
                        init={tynimce}
                      />
                      <ErrorMessage name={`descriptions.${index}.content`}>
                        {(msg) => {
                          <Form.Control.Feedback type="invalid" tooltip>
                            {msg}
                          </Form.Control.Feedback>;
                        }}
                      </ErrorMessage>
                    </Form.Group>
                    <Form.Group as={Col} md={12} className="position-relative mb-3">
                      <Form.Control type="hidden" name={`descriptions.${index}.id`} value={v.id} />
                      <Button variant="danger" onClick={() => remove(index)} size="sm" className="mb-3 mt-3">
                        <FontAwesomeIcon icon={faRemove} /> Remove
                      </Button>
                    </Form.Group>
                  </>
                ))}
            </Row>
            <Button variant="info" onClick={() => push({ content: '' })} size="sm" className="mb-3">
              {'Add Description'}
            </Button>
          </>
        )}
      </FieldArray>
    </>
  );
};

export default Description;
