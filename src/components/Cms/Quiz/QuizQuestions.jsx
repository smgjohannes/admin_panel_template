import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { endLoader } from '../../../features/main';
import { RequestStatus } from '../../../constants';
import Table from '../../Table';
import ErrorAlert from '../../Alerts/ErrorAlert';

import Empty from '../../Empty';
import { deleteQuizQuestion, getQuizQuestions } from '../../../features/quiz/quizQuestionSlice';
import { Date } from '../../../utils/Date';

const QuizQuestionTable = () => {
  const dispatch = useDispatch();
  const { error, data, quizQuestionsGetStatus, quizQuestionDeleteStatus, progress } = useSelector(
    (state) => state.quizQuestion
  );

  const [selectedQuizQuestion, setSelectedQuizQuestion] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    dispatch(getQuizQuestions({ include: 'answers' }));
  }, [dispatch]);

  quizQuestionDeleteStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  const columns = [
    { dataField: 'id', text: 'ID', hidden: true },
    {
      dataField: 'question',
      text: 'Question',
    },
    {
      dataField: 'total_score',
      text: 'Total score',
    },
    {
      dataField: 'created_at',
      text: 'Created At',
      formatter: (cellContent, row, rowIndex) => {
        return Date(row.created_at, 'MM/DD/YYYY');
      },
    },
    {
      dataField: 'updated_at',
      text: 'Updated At',
      formatter: (cellContent, row, rowIndex) => {
        return Date(row.updated_at, 'MM/DD/YYYY');
      },
    },
    {
      text: 'Actions',
      formatter: (cellContent, row, rowIndex) => {
        return (
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item title="View" as={Link} to={`/quizzes/${row.id}`}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View
              </Dropdown.Item>
              <Dropdown.Item title="Edit" as={Link} to={`/quizzes/${row.id}/edit`}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                title="Delete"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedQuizQuestion(row);
                  setShowDeleteAlert(!showDeleteAlert);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      <div className="mt-3">
        {quizQuestionsGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {quizQuestionDeleteStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {selectedQuizQuestion && (
          <>
            <SweetAlert
              show={showDeleteAlert}
              title="Are you sure?"
              text="You want to delete this record"
              showCancelButton
              onConfirm={() => {
                setShowDeleteAlert(!showDeleteAlert);
                dispatch(deleteQuizQuestion(selectedQuizQuestion.id));
              }}
              onCancel={() => {
                setShowDeleteAlert(!showDeleteAlert);
              }}
            />
          </>
        )}
      </div>
      {quizQuestionsGetStatus === RequestStatus.Success && data.length > 0 && (
        <>
          <Table entries={data} columns={columns} search={true} />
        </>
      )}
      {data.length === 0 && <Empty message={'No content(s) found'} />}
    </>
  );
};

export default QuizQuestionTable;
