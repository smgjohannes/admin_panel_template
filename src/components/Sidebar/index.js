import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Nav, Badge, Image, Button, Navbar, Dropdown } from 'react-bootstrap';

import { Routes } from '../../routes';
import Logo from '../../assets/img/app/logo.png';
import { logout } from '../../features/main';
import { SiteMenus } from '../../data';
import { useTranslation } from 'react-i18next';

const Sidebar = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? 'show' : '';
  const onCollapse = () => setShow(!show);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user } = props;

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = 'secondary',
      badgeColor = 'primary',
    } = props;
    const classNames = badgeText ? 'd-flex justify-content-start align-items-center justify-content-between' : '';
    const navItemClassName = link === pathname ? 'active' : '';
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{' '}
              </span>
            ) : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Brand className="me-lg-5" as={Link} to={Routes.Dashboard.path}>
          <Image src={Logo} className="navbar-brand-light" alt={'Namibian Constitution'} />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white mia-cms-page-top`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                <div className="d-block">
                  <h6>{user.name}</h6>
                  <Button
                    variant="secondary"
                    size="xs"
                    to={Routes.Login.path}
                    className="text-dark"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        dispatch(logout(navigate));
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> {t('signOut')}
                  </Button>
                </div>
              </div>
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title={t('siteName')} link="/" image={Logo} />
              <Dropdown.Divider className="my-3 border-indigo" />
              {SiteMenus.map((item) => {
                if (item.label === 'Divider') {
                  return <Dropdown.Divider className="my-3 border-indigo" key={item.id} />;
                }
                return <NavItem title={t(item.label)} link={item.link} icon={item.icon} key={item.id} />;
              })}

              <Dropdown.Divider className="my-3 border-indigo" />
              <NavItem title={t('users')} link={Routes.Users.path} />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

export default Sidebar;
