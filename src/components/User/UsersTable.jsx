import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { ButtonGroup, Dropdown, Button, Badge } from 'react-bootstrap';
import SweetAlert from 'sweetalert-react';
import { faEdit, faEllipsisH, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { endLoader } from '../../features/main';
import { deleteUser, getUsers } from '../../features/user/userSlice';
import { RequestStatus } from '../../constants';
import Table from '../Table';

import ErrorAlert from '../Alerts/ErrorAlert';

import { Date } from '../../utils/Date';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UsersTable = (props) => {
  const dispatch = useDispatch();
  const { error, success, users, usersGetStatus, progress, userDeleteStatus } = useSelector((state) => state.user);

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers({ page: 1000, query: { include: 'roles' } }));
  }, [dispatch]);

  userDeleteStatus === RequestStatus.Success &&
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  const { t } = useTranslation();

  const columns = [
    { dataField: 'id', text: 'ID', hidden: true },
    {
      dataField: 'name',
      text: t('name'),
      formatter: (cellContent, row, rowIndex) => {
        return <p>{row.name}</p>;
      },
    },
    {
      dataField: 'email',
      text: t('email'),
    },
    {
      dataField: 'email',
      text: `${t('lastLogin')} ${t('at')}`,
      formatter: (cellContent, row, rowIndex) => {
        return Date(row.last_login_at);
      },
    },
    {
      dataField: 'last_login_ip_address',
      text: `${t('lastLogin')} ${t('ip')}`,
    },
    {
      dataField: 'roles',
      text: `${t('roles')}`,
      formatter: (cellContent, row, rowIndex) => {
        if (row.roles) {
          return (
            <>
              {row.roles.map((r) => (
                <Badge bg="success" className="p-1">
                  {r.name}
                </Badge>
              ))}
            </>
          );
        }

        return <p>{row.name}</p>;
      },
    },
    {
      dataField: '',
      text: t('actions'),
      formatter: (cellContent, row, rowIndex) => {
        return (
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item title={t('view')} as={Link} to={`/users/${row.id}`}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> {t('view')}
              </Dropdown.Item>
              <Dropdown.Item title={t('edit')} as={Link} to={`/users/${row.id}/edit`}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> {t('edit')}
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedUser(row);
                  setShowDeleteAlert(!showDeleteAlert);
                }}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> {t('delete')}
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
      <div>
        {usersGetStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {userDeleteStatus === RequestStatus.Error && <ErrorAlert message={error} />}
        {userDeleteStatus === RequestStatus.Success && <ErrorAlert message={success} />}
      </div>
      {selectedUser && (
        <>
          <SweetAlert
            show={showDeleteAlert}
            title={t('deleteActionText1')}
            text={t('deleteActionText2')}
            showCancelButton
            onConfirm={() => {
              setShowDeleteAlert(!showDeleteAlert);
              dispatch(deleteUser(selectedUser.id));
            }}
            onCancel={() => {
              setShowDeleteAlert(!showDeleteAlert);
            }}
          />
        </>
      )}
      {usersGetStatus === RequestStatus.Success && <Table entries={users} columns={columns} />}
    </>
  );
};

export default UsersTable;
