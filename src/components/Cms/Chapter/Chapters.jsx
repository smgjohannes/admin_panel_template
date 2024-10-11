import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';

import { endLoader } from '../../../features/main';
import { getChapters } from '../../../features/chapter/chapterSlice';
import { RequestStatus } from '../../../constants';
import ErrorAlert from '../../Alerts/ErrorAlert';
import Empty from '../../Empty';
import ChapterItem from './ChapterItem';
import { CustomPagination } from '../../Pagination';

const Chapters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { error, chapters, chaptersGetStatus, chapterDeleteStatus, progress, totalItems, itemsPerPage } = useSelector(
    (state) => state.chapter
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getChapters({ page: currentPage, per_page: itemsPerPage, include: 'translations.media' }));
  }, [dispatch, currentPage, itemsPerPage]);

  chapterDeleteStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      <LoadingBar progress={progress} onLoaderFinished={() => dispatch(endLoader())} />
      <div className="mt-3">
        {chaptersGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {chapterDeleteStatus === RequestStatus.Error && <ErrorAlert message={error} />}
      </div>
      {chaptersGetStatus === RequestStatus.Success && chapters.length > 0 && (
        <>
          <Row xs={1} md={2} className="g-4">
            {chapters.map((chapter) => (
              <ChapterItem chapter={chapter} />
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
      {chapters.length === 0 && <Empty message={t('chaptersPage.noContent')} />}
    </>
  );
};

export default Chapters;
