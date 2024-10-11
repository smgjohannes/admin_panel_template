import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { Link } from 'react-router-dom';
import { Row, Card, Col, ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';

import { faEdit, faEllipsisH, faTrashAlt, faEye, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { endLoader } from '../../../features/main';
import { getArticles, deleteArticle, getArticlesByChapterId } from '../../../features/article/articleSlice';
import { RequestStatus } from '../../../constants';
import ErrorAlert from '../../Alerts/ErrorAlert';
import { CustomPagination } from '../../Pagination';

import Empty from '../../Empty';

import Modal from '../../Modal';
import ArticleMediaForm from './ArticleMediaForm';
import { useTranslation } from 'react-i18next';
import { truncateText } from '../../../utils/string';
import AudioPlayer from '../../Media/AudioPlayer';

const ArticlesTable = (props) => {
  const { chapter } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { articles, articlesGetStatus, articleDeleteStatus, progress, error, totalItems, itemsPerPage } = useSelector(
    (state) => state.article
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (chapter) {
      dispatch(
        getArticlesByChapterId({
          chapterId: chapter.id,
          params: { page: currentPage, per_page: itemsPerPage, include: 'translations.media' },
        })
      );
    } else {
      dispatch(getArticles({ page: currentPage, per_page: itemsPerPage, include: 'translations.media' }));
    }
  }, [chapter, currentPage, itemsPerPage, dispatch]);

  const ref = useRef(null);
  const modalRef = useRef();

  const openModal = () => {
    setTimeout(() => {
      modalRef.current.open();
    }, 500);
  };

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  articleDeleteStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  const ArticleItem = (props) => {
    const { article } = props;
    return (
      <Col xs={12} sm={6} xl={3} ref={ref}>
        <Card>
          <Card.Header>
            <Dropdown as={ButtonGroup} id="dropdown-item-button" title="Dropdown button">
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  ref={ref}
                  title={t('articlesPage.addMedia')}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedArticle(article);
                    setSelectedForm(<ArticleMediaForm article={article} locale={article.locale} />);
                    openModal();
                  }}
                >
                  <FontAwesomeIcon ref={ref} icon={faVideo} className="me-2" /> {t('articlesPage.addMedia')}
                </Dropdown.Item>
                <Dropdown.Item title={t('view')} as={Link} to={`/articles/${article.id}`}>
                  <FontAwesomeIcon icon={faEye} className="me-2" /> {t('view')}
                </Dropdown.Item>
                <Dropdown.Item title={t('edit')} as={Link} to={`/articles/${article.id}/edit`}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> {t('edit')}
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-danger"
                  title={t('delete')}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedArticle(article);
                    setShowDeleteAlert(!showDeleteAlert);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> {t('delete')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Header>
          <Card.Body>
            <Card.Title>{truncateText(article.translations[0].title, 60)}</Card.Title>
            <Card.Text>{article.translations[0].number}</Card.Text>
            {article.translations?.[0]?.media?.length > 0 && (
              <Card.Footer>
                <AudioPlayer fileUrl={article.translations[0].media[0].url} />
              </Card.Footer>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <React.Fragment>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      <div className="mt-3">
        {articlesGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {articlesGetStatus === RequestStatus.NetworkError && <ErrorAlert message={error} />}
        {selectedArticle && (
          <div ref={ref}>
            <Modal title={selectedArticle.translations[0].title} ref={modalRef} fullscreen={false} size="md" centered>
              {selectedForm}
            </Modal>
            <SweetAlert
              show={showDeleteAlert}
              title={t('deleteActionText1')}
              text={t('deleteActionText2')}
              showCancelButton
              onConfirm={() => {
                setShowDeleteAlert(!showDeleteAlert);
                dispatch(deleteArticle(selectedArticle.id));
              }}
              onCancel={() => {
                setShowDeleteAlert(!showDeleteAlert);
              }}
            />
          </div>
        )}
      </div>

      {articles && articles.length > 0 && (
        <>
          <Row xs={1} md={2} className="g-4">
            {articles.map((article) => (
              <ArticleItem article={article} />
            ))}
          </Row>
          <CustomPagination
            startItem={startItem}
            endItem={endItem}
            totalItems={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}
      {articles.length === 0 && <Empty message={t('articlesPage.noContent')} />}
    </React.Fragment>
  );
};

export default ArticlesTable;
