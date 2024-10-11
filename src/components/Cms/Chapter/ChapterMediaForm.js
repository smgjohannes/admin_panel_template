import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card } from 'react-bootstrap';
import SuccessAlert from '../../Alerts/SuccessAlert';
import ErrorAlert from '../../Alerts/ErrorAlert';
import ValidationError from '../../Errors/ValidationError';
import { uploadChapterAudio } from '../../../features/chapter/chapterSlice';
import { RequestStatus } from '../../../constants';
import LoadingSpinner from '../../LoadingSpinner';
import { useTranslation } from 'react-i18next';

const ChapterMediaForm = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { chapter, locale } = props;
  const { error, validationErrors, success, chapterUploadStatus } = useSelector((state) => state.chapter);

  const [formData, setFormData] = useState({ audios: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(uploadChapterAudio({ id: chapter.id, locale, formData: new FormData(e.currentTarget) }));
  };

  chapterUploadStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  return (
    <>
      <div className="mt-3">
        {chapterUploadStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {chapterUploadStatus === RequestStatus.Success && <SuccessAlert message={success} />}
        {validationErrors && <ValidationError errors={validationErrors} />}
      </div>
      <Card>
        <Card.Header>{t('chapterForm.addAudioFile')}</Card.Header>
        <Card.Body>
          <Form autoComplete="off" className="mt-4" onSubmit={handleSubmit}>
            <Form.Group id="audioInput" className="mb-4">
              <Form.Label htmlFor="audio">{t('audio')}</Form.Label>
              <Form.Control
                id="audio"
                type="file"
                name="audio"
                accept="audio/*"
                onChange={(e) => {
                  setFormData({ ...formData, audio: e.currentTarget.files });
                }}
              />
              <Form.Text id="audiodHelpBlock" muted>
                {t('allowedAudio')}
              </Form.Text>
            </Form.Group>
            <div className="mb-3">
              <Button variant="primary" type="submit" disabled={chapterUploadStatus === RequestStatus.Getting}>
                {chapterUploadStatus === RequestStatus.Getting ? <LoadingSpinner /> : t('save')}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ChapterMediaForm;
