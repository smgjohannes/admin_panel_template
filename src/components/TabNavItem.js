import React from 'react';
import { Nav } from 'react-bootstrap';

export const TabNavItem = (props) => {
  const { item } = props;
  return (
    <Nav.Item key={item.id}>
      <Nav.Link eventKey={item.id} key={item.id} className="mb-sm-2 m-2 text-black">
        {item.value}
        {item.label}
      </Nav.Link>
    </Nav.Item>
  );
};
