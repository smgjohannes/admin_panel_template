import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Tabs, Tab } from 'react-bootstrap';
import Breadcrumb from '../../components/Breadcrumb';
import QuizQuestionTable from '../../components/Cms/Quiz/QuizQuestions';
import Modal from '../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import QuizQuestionForm from '../../components/Cms/Quiz/QuizQuestionForm';
import ResponsesView from '../../components/Cms/Quiz/ResponsesView';

const QuizzesPage = () => {
  const ref = useRef(null);
  const modalRef = useRef();
  const openModal = () => modalRef.current.open();

  return (
    <>
      <Breadcrumb
        pageTitle={'Quizzes'}
        ref={ref}
        items={[
          {
            title: 'Quizzes',
            active: true,
            link: '#',
          },
        ]}
      >
        <Modal title={'New Quiz Question'} ref={modalRef} fullscreen={true} size="lg">
          <QuizQuestionForm />
        </Modal>
        <Button
          onClick={() => {
            openModal();
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> New Quiz Question
        </Button>
      </Breadcrumb>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quizzes</title>
        <link rel="canonical" href={window.location.url} />
      </Helmet>
      <Tabs defaultActiveKey="quizzes" id="quiz-tabs" className="mb-3">
        <Tab eventKey="quizzes" title="Quizzes">
          <QuizQuestionTable />
        </Tab>

        <Tab eventKey="responses" title="Responses">
          <ResponsesView />
        </Tab>
      </Tabs>
    </>
  );
};

export default QuizzesPage;
