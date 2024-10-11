import React from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

import ErrorMessage from '../../Forms/ErrorMessage';

const QuizAnswersForm = ({ ...props }) => {
  const { handleBlur, values, setFieldValue } = props;
  return (
    <FieldArray name="answers">
      {({ remove, push }) => (
        <Card className="mt-3 mb-3">
          <Card.Body>
            {values.answers.length > 0 &&
              values.answers.map((ans, index) => (
                <Row className="mb-3" key={index}>
                  <Form.Group
                    as={Col}
                    md={12}
                    id={`answers.${index}.answerInput`}
                    className="mb-3 position-relative"
                    key={`answers-${index}.answer`}
                  >
                    <Form.Label htmlFor={`answers.${index}.answer`}>Answer</Form.Label>
                    <Form.Control
                      id={`answers.${index}.answer`}
                      value={ans.answer}
                      as="textarea"
                      placeholder={'A short answer'}
                      name={`answers.${index}.answer`}
                      onChange={(e) => {
                        setFieldValue(`answers.${index}.answer`, e.target.value);
                      }}
                      onBlur={handleBlur}
                    />
                    <Form.Text id={`answers.${index}.answerHelpBlock`} muted>
                      Note this the answer that user will choose when participating
                    </Form.Text>
                    <ErrorMessage name={`answers.${index}.answer`}>
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
                    id={`answers.${index}.scoreInput`}
                    className="mb-3 position-relative"
                    key={`answers-${index}.score`}
                  >
                    <Form.Label htmlFor="number">Score</Form.Label>
                    <Form.Control
                      id={`answers.${index}.score`}
                      value={ans.score}
                      type="number"
                      name={`answers.${index}.score`}
                      onChange={(e) => {
                        setFieldValue(`answers.${index}.score`, e.target.value);
                      }}
                      onBlur={handleBlur}
                    />
                    <Form.Text id={`answers.${index}.scoreHelpBlock`} muted>
                      Total score for this answer if correct the score
                    </Form.Text>
                    <ErrorMessage name={`answers.${index}.score`}>
                      {(msg) => {
                        <Form.Control.Feedback type="invalid" tooltip>
                          {msg}
                        </Form.Control.Feedback>;
                      }}
                    </ErrorMessage>
                  </Form.Group>
                  <Form.Group id={`answers.${index}.isCorrectInput`} className="mb-3 position-relative" as={Col} sm={6}>
                    <Form.Check
                      label="Correct"
                      id={`answers.${index}.is_correct`}
                      type="switch"
                      defaultChecked={ans.is_correct}
                      name={`answers.${index}.is_correct`}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue(`answers.${index}.is_correct`, e.target.checked);
                      }}
                    />
                    <Form.Text id={`answers.${index}.scoreHelpBlock`} muted>
                      Check if this is the correct the answer
                    </Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} md={12} className="position-relative mb-3">
                    <Form.Control type="hidden" name={`answers.${index}.id`} value={ans.id} />
                    <Button variant="danger" onClick={() => remove(index)} size="sm" className="mb-3 mt-3">
                      <FontAwesomeIcon icon={faRemove} /> Remove
                    </Button>
                  </Form.Group>
                </Row>
              ))}
            <Button
              variant="info"
              onClick={() => push({ answer: '', score: 0, is_correct: false })}
              size="sm"
              className="mb-3"
            >
              {'Add Answer'}
            </Button>
          </Card.Body>
        </Card>
      )}
    </FieldArray>
  );
};

export default QuizAnswersForm;
