import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { Row, Col, Card, ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import { faEllipsisH, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { endLoader } from '../../features/main';
import { getAllMedia, deleteMedia } from '../../features/media/mediaSlice';

import { RequestStatus } from '../../constants';

import ErrorAlert from '../Alerts/ErrorAlert';
import SuccessAlert from '../Alerts/SuccessAlert';
import Empty from '../Empty';
import { useTranslation } from 'react-i18next';
import { CustomPagination } from '../Pagination';

const MediaTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error, data, mediasGetStatus, mediaDeleteStatus, progress, totalItems, itemsPerPage } = useSelector(
    (state) => state.media
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllMedia({ page: currentPage }));
  }, [dispatch, currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const [media, setMedia] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  mediaDeleteStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  const MediaItem = (props) => {
    const { item } = props;
    return (
      <Col sm={3}>
        <Card className="m-1">
          <Card.Header>
            <Dropdown as={ButtonGroup} id="dropdown-item-button" title="Dropdown button">
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  className="text-danger"
                  title={t('delete')}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDeleteAlert(!showDeleteAlert);
                    setMedia(item);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> {t('delete')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body>
            <Card.Title>{item.filename}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      <div className="mt-3">
        {mediasGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {mediaDeleteStatus === RequestStatus.Success && <SuccessAlert message={'File deleted successfully!'} />}
      </div>
      {media && (
        <>
          <SweetAlert
            show={showDeleteAlert}
            title={t('deleteActionText1')}
            text={t('deleteActionText2')}
            showCancelButton
            onConfirm={() => {
              setShowDeleteAlert(!showDeleteAlert);
              dispatch(deleteMedia(media.id));
            }}
            onCancel={() => {
              setShowDeleteAlert(!showDeleteAlert);
            }}
          />
        </>
      )}

      {mediasGetStatus === RequestStatus.Success && (
        <>
          <Row>
            {data.map((item) => (
              <MediaItem item={item} />
            ))}
            {data.length === 0 && <Empty message={'No file(s) found'} />}
          </Row>
          {data && data.length > 0 && (
            <CustomPagination
              startItem={startItem}
              endItem={endItem}
              totalItems={totalItems}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
};

export default MediaTable;
