import React from 'react';
import { Image } from '@themesberg/react-bootstrap';
import Logo from '../assets/img/app/logo-512.png';

const Preloader = (props) => {
  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? '' : 'show'}`}>
      <Image className="loader-element animate__animated animate__jackInTheBox" src={Logo} height={40} />
    </div>
  );
};

export default Preloader;
