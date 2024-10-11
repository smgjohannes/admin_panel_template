import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Nav, Navbar, Dropdown, Container } from 'react-bootstrap';
import { Routes } from '../../routes';

import { logout } from '../../features/main';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = props;

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center"></div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{user.name}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" as={Link} to={Routes.Account.path}>
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> Account
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="fw-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    try {
                      dispatch(logout(navigate));
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
