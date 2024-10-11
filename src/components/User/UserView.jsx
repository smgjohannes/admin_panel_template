import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { Date } from '../../utils/Date';
import { useTranslation } from 'react-i18next';

const UserView = (props) => {
  const { user } = props;
  const { roles } = user;
  const { t } = useTranslation();

  return (
    <Card>
      <Card.Body>
        <Card.Title>{user.email}</Card.Title>
        <Card.Title>{user.phone}</Card.Title>
        <Card.Text>
          <strong>{t('lastLogin')}:</strong> <span>{Date(user.last_login_at)}</span>
          <br />
          <strong>
            {t('lastLogin')} {t('ip')}:
          </strong>{' '}
          <span>{user.last_login_ip_address}</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        {roles &&
          roles.map((r) => (
            <>
              <Badge bg="primary">{r.name}</Badge>
            </>
          ))}
      </Card.Footer>
    </Card>
  );
};

export default UserView;
