import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ children, ...props }) => {
  return (
    <>
      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
      <span className="visually-hidden">Loading...</span>
    </>
  );
};

export default LoadingSpinner;
