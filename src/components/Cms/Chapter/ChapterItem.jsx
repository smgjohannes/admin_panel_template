import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Col, ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import { faEdit, faEllipsisH, faTrashAlt, faEye, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

import { deleteChapter } from '../../../features/chapter/chapterSlice';
import { RequestStatus } from '../../../constants';

import Modal from '../../Modal';
import ChapterMediaForm from './ChapterMediaForm';

import { truncateText } from '../../../utils/string';
import AudioPlayer from '../../Media/AudioPlayer';

const ChapterItem = (props) => {
  const { chapter } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { chapterDeleteStatus } = useSelector((state) => state.chapter);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  chapterDeleteStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  const ref = useRef(null);
  const modalRef = useRef();

  const openModal = () => {
    setTimeout(() => {
      modalRef.current.open();
    }, 500);
  };

  return (
    <>
      <Col xs={12} sm={6} xl={3} ref={ref}>
        <Card>
          <Card.Header>
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item title={t('view')} as={Link} to={`/chapters/${chapter.id}`}>
                  <FontAwesomeIcon icon={faEye} className="me-2" /> {t('view')}
                </Dropdown.Item>
                <Dropdown.Item
                  ref={ref}
                  title={t('chapterForm.addAudioFile')}
                  onClick={(e) => {
                    e.preventDefault();
                    openModal();
                  }}
                >
                  <FontAwesomeIcon ref={ref} icon={faVideo} className="me-2" /> {t('addMedia')}
                </Dropdown.Item>
                <Dropdown.Item title={t('view')} as={Link} to={`/chapters/${chapter.id}/articles`}>
                  <FontAwesomeIcon icon={faEye} className="me-2" /> {t('articles')}
                </Dropdown.Item>
                <Dropdown.Item title={t('edit')} as={Link} to={`/chapters/${chapter.id}/edit`}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> {t('edit')}
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-danger"
                  title={t('delete')}
                  onClick={(e) => {
                    e.preventDefault();
                    <SweetAlert
                      show={showDeleteAlert}
                      title={t('deleteActionText1')}
                      text={t('deleteActionText2')}
                      showCancelButton
                      onConfirm={() => {
                        setShowDeleteAlert(!showDeleteAlert);
                        dispatch(deleteChapter(chapter.id));
                      }}
                      onCancel={() => {
                        setShowDeleteAlert(!showDeleteAlert);
                      }}
                    />;
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> {t('delete')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body>
            <Card.Title>{truncateText(chapter.translations[0].title, 60)}</Card.Title>
            <Card.Text>{chapter.translations[0].number}</Card.Text>
            {chapter.translations?.[0]?.media?.length > 0 && (
              <Card.Footer>
                <AudioPlayer fileUrl={chapter.translations[0].media[0].url} />
              </Card.Footer>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Modal title={chapter.translations[0].title} ref={modalRef} fullscreen={false} size="md" centered>
        <ChapterMediaForm chapter={chapter} />
      </Modal>
    </>
  );
};

export default ChapterItem;
