import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import ErrorAlert from '../../Alerts/ErrorAlert';
import SuccessAlert from '../../Alerts/SuccessAlert';
import ValidationError from '../../Errors/ValidationError';
import LoadingSpinner from '../../LoadingSpinner';

import { RequestStatus } from '../../../constants';
import { createQuizQuestion, editQuizQuestion } from '../../../features/quiz/quizQuestionSlice';
import QuizAnswersForm from './QuizAnswersForm';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';

const QuizQuestionForm = (props) => {
  const dispatch = useDispatch();
  const { quizQuestion } = props;
  const { error, validationErrors, success, quizQuestionCreateStatus, quizQuestionPatchStatus } = useSelector(
    (state) => state.quizQuestion
  );

  quizQuestionCreateStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  quizQuestionPatchStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  return (
    <>
      <div className="mt-3">
        {quizQuestionCreateStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {quizQuestionCreateStatus === RequestStatus.Success && <SuccessAlert message={success} />}
        {quizQuestionPatchStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {quizQuestionPatchStatus === RequestStatus.Success && <SuccessAlert message={success} />}
        {validationErrors && <ValidationError errors={validationErrors} />}
      </div>
      <Card>
        <Card.Body>
          {quizQuestion ? (
            <Formik
              validationSchema={Yup.object().shape({
                question: Yup.string().required('Provide a quiz question'),
                total_score: Yup.number().default(0),
                description: Yup.string().required('Provide a description for this quiz'),
                answers: Yup.array().nullable(),
              })}
              onSubmit={async (values, { isSubmitting }) => {
                const formData = new FormData();
                formData.append('_method', 'PATCH');
                formData.append('formData', JSON.stringify(values));
                try {
                  dispatch(editQuizQuestion({ id: quizQuestion.id, formData }));
                  isSubmitting(false);
                } catch (err) {
                  console.log(err.message);
                }
              }}
              initialValues={{
                question: quizQuestion.question,
                total_score: quizQuestion.total_score,
                description: quizQuestion.description,
                answers: quizQuestion.answers
                  ? quizQuestion.answers.map((r) => ({
                      id: r.id,
                      answer: r.answer,
                      score: r.score,
                      is_correct: r.is_correct,
                    }))
                  : [],
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} noValidate method="post" encType="multipart/form-data">
                  <input type="hidden" name="_method" value="PUT" />
                  <div className="d-flex justify-content-center align-self-center flex-column">
                    <Form.Group id="questionInput" className="mb-3 position-relative">
                      <Form.Label htmlFor="question">Question</Form.Label>
                      <Form.Control
                        id="question"
                        value={values.question}
                        type="text"
                        name="question"
                        onChange={handleChange}
                        isInvalid={!!errors.question}
                        onBlur={handleBlur}
                      />
                      {errors.question && touched.question ? (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.question}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Form.Group id="descriptionInput" className="mb-3 position-relative">
                      <Form.Label htmlFor="description">Total Score</Form.Label>
                      <Form.Control
                        id="description"
                        value={values.description}
                        name="description"
                        as="textarea"
                        style={{ height: '100px' }}
                        placeholder={'Short description or hint for the quiz'}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                        onBlur={handleBlur}
                      />
                      {errors.description && touched.description ? (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.description}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Form.Group id="totalScoreInput" className="mb-3 position-relative">
                      <Form.Label htmlFor="totalScore">Total Score</Form.Label>
                      <Form.Control
                        id="totalScore"
                        value={values.total_score}
                        type="text"
                        name="total_score"
                        onChange={handleChange}
                        isInvalid={!!errors.total_score}
                        onBlur={handleBlur}
                      />
                      {errors.total_score && touched.total_score ? (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.total_score}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Form.Group id="answers" className="mb-3 position-relative">
                      <QuizAnswersForm values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <Button variant="warning" as={Link} to={Routes.QuizQuestions.path}>
                      Cancel
                    </Button>{' '}
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={quizQuestionPatchStatus === RequestStatus.Getting}
                    >
                      {quizQuestionPatchStatus === RequestStatus.Getting ? <LoadingSpinner /> : 'Save Changes'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              validationSchema={Yup.object().shape({
                question: Yup.string().required('Provide a quiz question text'),
                total_score: Yup.number().default(0),
                description: Yup.string().required('Provide a description detailing this quiz'),
                answers: Yup.array().nullable(),
              })}
              onSubmit={async (values, { isSubmitting }) => {
                const formData = new FormData();
                formData.append('formData', JSON.stringify(values));
                try {
                  dispatch(createQuizQuestion(formData));
                  isSubmitting(false);
                } catch (err) {
                  console.log(err.message);
                }
              }}
              initialValues={{
                question: '',
                total_score: 0,
                description: '',
                answers: [],
              }}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} noValidate method="post" encType="multipart/form-data">
                  <div className="d-flex justify-content-center align-self-center flex-column">
                    <Form.Group id="questionInput" className="mb-3 position-relative">
                      <Form.Label htmlFor="question">Question</Form.Label>
                      <Form.Control
                        id="question"
                        value={values.question}
                        type="text"
                        name="question"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.question}
                      />
                      {errors.question && touched.question ? (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.question}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Form.Group id="descriptionInput" className="mb-3 position-relative">
                      <Form.Label htmlFor="description">Description</Form.Label>
                      <Form.Control
                        id="description"
                        value={values.description}
                        name="description"
                        as="textarea"
                        style={{ height: '100px' }}
                        placeholder={'Short description or hint for the quiz'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.description}
                      />
                      {errors.description && touched.description ? (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.description}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Form.Group id="totalScoreInput" className="mb-3 position-relative">
                      <Form.Label htmlFor="totalScore">Total Score</Form.Label>
                      <Form.Control
                        id="totalScore"
                        value={values.total_score}
                        type="number"
                        name="total_score"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.total_score}
                      />
                      {errors.total_score && touched.total_score ? (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors.total_score}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Form.Group id="answers" className="mb-3 position-relative">
                      <QuizAnswersForm values={values} handleBlur={handleBlur} setFieldValue={setFieldValue} />
                    </Form.Group>
                  </div>
                  <div className="mt-3">
                    <Button variant="warning" as={Link} to={Routes.QuizQuestions.path}>
                      Cancel
                    </Button>{' '}
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={quizQuestionCreateStatus === RequestStatus.Getting}
                    >
                      {quizQuestionCreateStatus === RequestStatus.Getting ? <LoadingSpinner /> : 'Save'}
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

export default QuizQuestionForm;
