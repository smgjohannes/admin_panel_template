import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Spinner } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { useTranslation } from 'react-i18next';
import { getQuizParticipants } from '../../../features/quiz/quizQuestionSlice';
import { RequestStatus } from '../../../constants';
import ErrorAlert from '../../Alerts/ErrorAlert';
import Table from '../../Table';
import Empty from '../../Empty';
import moment from 'moment';

const ResponsesView = () => {
  const dispatch = useDispatch();
  const { error, participants, quizParticipantsStatus, progress } = useSelector((state) => state.quizQuestion);
  const { t } = useTranslation();
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    dispatch(getQuizParticipants({ include: 'responses' }));
  }, [dispatch]);

  useEffect(() => {
    if (participants.length > 0) {
      let winner = null;
      participants.forEach((participant) => {
        const correctAnswers = participant.responses.filter((response) => response.answer.is_correct).length;
        const duration = moment(participant.end_time).diff(moment(participant.start_time), 'seconds');

        if (
          !winner ||
          correctAnswers > winner.correctAnswers ||
          (correctAnswers === winner.correctAnswers && duration < winner.duration)
        ) {
          winner = {
            name: participant.name,
            correctAnswers,
            duration,
          };
        }
      });
      setWinner(winner);
    } else {
      setWinner(null);
    }
  }, [participants]);

  const columns = [
    {
      dataField: 'name',
      text: t('name'),
    },
    {
      dataField: 'phone',
      text: t('phone'),
    },
    {
      dataField: 'email',
      text: t('email'),
    },
    {
      dataField: 'city',
      text: t('city'),
    },
    {
      dataField: 'state',
      text: t('state'),
    },
    {
      dataField: 'responses',
      text: t('correctAnswers'),
      formatter: (cellContent, row) => {
        return row.responses.filter((response) => response.answer.is_correct).length;
      },
    },
    {
      dataField: 'responses',
      text: t('incorrectAnswers'),
      formatter: (cellContent, row) => {
        const correctAnswers = row.responses.filter((response) => response.answer.is_correct).length;
        return row.responses.length - correctAnswers;
      },
    },
    {
      dataField: 'start_time',
      text: t('startTime'),
      formatter: (cellContent, row) => moment(row.start_time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      dataField: 'end_time',
      text: t('endTime'),
      formatter: (cellContent, row) => moment(row.end_time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      dataField: 'duration',
      text: t('durationSeconds'),
      formatter: (cellContent, row) => moment(row.end_time).diff(moment(row.start_time), 'seconds'),
    },
  ];

  return (
    <Card className="mb-2">
      <LoadingBar progress={progress} />
      <Card.Body>
        <Card.Title>{t('quizParticipants')}</Card.Title>

        <div className="mt-3">
          {quizParticipantsStatus === RequestStatus.Error && <ErrorAlert message={error} />}
          {quizParticipantsStatus === RequestStatus.Getting && <Spinner animation="border" role="status" />}
        </div>

        {quizParticipantsStatus === RequestStatus.Success && participants.length > 0 ? (
          <>
            <Table entries={participants} columns={columns} search={true} />
            {winner && (
              <Card.Text className="mt-3">
                <strong>{t('winner')}:</strong> {winner.name} ({winner.correctAnswers} {t('correctAnswers')} in{' '}
                {winner.duration} {t('seconds')})
              </Card.Text>
            )}
          </>
        ) : (
          <Empty message={t('No content(s) found')} />
        )}
      </Card.Body>
    </Card>
  );
};

export default ResponsesView;
