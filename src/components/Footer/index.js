import React from 'react';
import moment from 'moment-timezone';
import { Row, Col, Card } from 'react-bootstrap';

import { Routes } from '../../routes';
import { useTranslation } from 'react-i18next';

const Footer = (props) => {
  const currentYear = moment().get('year');
  const { t } = useTranslation();

  return (
    <div>
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={12} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              © {`${currentYear} `}
              <Card.Link
                href={Routes.HomePage.path}
                target="_blank"
                className="text-blue text-decoration-none fw-normal"
              >
                {t('footer.copyRighter')} - {t('footer.developer')}
              </Card.Link>
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default Footer;
