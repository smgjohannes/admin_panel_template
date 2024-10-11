import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import AppLogo from '../assets/img/app/logo.png';
import { checkLogin } from '../features/main';
import { Routes } from '../routes';

const Cms = () => {
  const { token } = useSelector((state) => state.main);

  const user = token.getUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkLogin(navigate));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (user) {
      navigate(Routes.Dashboard.path);
    }
  }, [navigate, user]);

  return (
    <>
      <main>
        <section className="section section-lg bg-white">
          <Container>
            <div className="d-flex justify-content-center align-items-md-center my-3">
              <Image src={AppLogo} fluid />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Cms;
