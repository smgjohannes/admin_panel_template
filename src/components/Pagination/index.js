import React from 'react';
import { Card, Pagination as BasePagination } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const CustomPagination = (props) => {
  const { t } = useTranslation();
  const { totalItems, startItem, endItem, totalPages, currentPage, handlePageChange } = props;

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage - halfVisible <= 0) {
      end = Math.min(totalPages, maxVisiblePages);
    }

    if (currentPage + halfVisible > totalPages) {
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Card className="mt-5">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span>{t('showingItems', { startItem, endItem, totalItems })}</span>
          <BasePagination>
            <BasePagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <BasePagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

            {pageNumbers.map((number) => (
              <BasePagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </BasePagination.Item>
            ))}

            <BasePagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <BasePagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </BasePagination>
        </div>
      </Card.Body>
    </Card>
  );
};
