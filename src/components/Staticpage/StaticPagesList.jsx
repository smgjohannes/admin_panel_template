import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { ButtonGroup, Dropdown, Button } from 'react-bootstrap';

import { faEdit, faEllipsisH, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SweetAlert from 'sweetalert-react';

import { endLoader } from '../../features/main';
import { getPages, deletePage } from '../../features/staticpage/staticpageSlice';
import { RequestStatus } from '../../constants';
import Table from '../Table';
import ErrorAlert from '../Alerts/ErrorAlert';

import Empty from '../Empty';

const StaticPagesList = () => {
  const dispatch = useDispatch();
  const { error, pages, pagesGetStatus, pageDeleteStatus, progress } = useSelector((state) => state.page);

  const [selectedPage, setSelectedPage] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    dispatch(getPages({ include: 'translations' }));
  }, [dispatch]);

  pageDeleteStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  const columns = [
    { dataField: 'id', text: 'ID', hidden: true },
    {
      dataField: 'translations.0.title',
      text: 'Title',
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
              <Dropdown.Item title="View" as={Link} to={`/staticpages/${row.id}`}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View
              </Dropdown.Item>
              <Dropdown.Item title="Edit" as={Link} to={`/staticpages/${row.id}/edit`}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                title="Delete"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPage(row);
                  setShowDeleteAlert(!showDeleteAlert);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                Delete
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
        {pagesGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {pageDeleteStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {selectedPage && (
          <>
            <SweetAlert
              show={showDeleteAlert}
              title="Are you sure?"
              text="You want to delete this record"
              showCancelButton
              onConfirm={() => {
                setShowDeleteAlert(!showDeleteAlert);
                dispatch(deletePage(selectedPage.id));
              }}
              onCancel={() => {
                setShowDeleteAlert(!showDeleteAlert);
              }}
            />
          </>
        )}
      </div>
      {pagesGetStatus === RequestStatus.Success && pages.length > 0 && (
        <>
          <Table entries={pages} columns={columns} search={true} />
        </>
      )}
      {pages.length === 0 && <Empty message={'No page(s) found'} />}
    </>
  );
};

export default StaticPagesList;
