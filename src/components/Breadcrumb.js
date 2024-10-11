import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb as BC } from 'react-bootstrap';

const Breadcrumb = ({ children, ...props }) => {
  const { items, pageTitle } = props;
  return (
    <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" ref={props.ref}>
      <div className="d-block mb-4 mb-xl-0">
        <BC className="d-none d-md-inline-block" listProps={{ className: 'breadcrumb-dark breadcrumb-transparent' }}>
          <BC.Item>
            <FontAwesomeIcon icon={faHome} />
          </BC.Item>
          {items.map((item, index) => (
            <BC.Item key={index} active={item.active ?? false} href={`${item.link}`}>
              {item.title}
            </BC.Item>
          ))}
        </BC>
        <h4>{pageTitle}</h4>
      </div>
      {children}
    </div>
  );
};

export default Breadcrumb;
