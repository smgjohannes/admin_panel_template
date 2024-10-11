import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal as BootstrapModal } from 'react-bootstrap';

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);
  const { fullscreen, size, centered } = props;

  useImperativeHandle(ref, () => {
    return {
      open: () => open(),
      close: () => close(),
    };
  });

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <BootstrapModal
        show={open}
        onHide={close}
        aria-labelledby={props.title}
        fullscreen={fullscreen ? fullscreen : false}
        size={size}
        centered={centered}
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title id={props.title}>{props.title}</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>{props.children}</BootstrapModal.Body>
      </BootstrapModal>,
      document.getElementById('modal-root')
    );
  }
  return null;
});

export default Modal;
