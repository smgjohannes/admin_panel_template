import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { Helmet } from 'react-helmet';

import ErrorAlert from '../../components/Alerts/ErrorAlert';
import { RequestStatus } from '../../constants';
import { endLoader } from '../../features/main';
import Breadcrumb from '../../components/Breadcrumb';
import { Routes } from '../../routes';
import { getQuizQuestionById } from '../../features/quiz/quizQuestionSlice';
import QuizQuestionForm from '../../components/Cms/Quiz/QuizQuestionForm';

const QuizQuestionEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, quizQuestion, quizQuestionGetStatus, progress } = useSelector((state) => state.quizQuestion);

  useEffect(() => {
    dispatch(getQuizQuestionById({ id, query: { include: 'answers' } }));
  }, [dispatch, id]);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      {quizQuestionGetStatus === RequestStatus.Success && quizQuestion && (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{quizQuestion.question}</title>
          </Helmet>
          <Breadcrumb
            pageTitle={quizQuestion.question}
            items={[
              {
                title: 'Quizzes',
                active: false,
                link: Routes.QuizQuestions.path,
              },
              {
                title: quizQuestion.question,
                active: true,
                link: '#',
              },
            ]}
          />
        </>
      )}
      <div className="mt-3">{quizQuestionGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}</div>
      {quizQuestionGetStatus === RequestStatus.Success && <QuizQuestionForm quizQuestion={quizQuestion} />}
    </>
  );
};

export default QuizQuestionEditPage;
