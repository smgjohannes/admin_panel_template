import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const CheckboxField = (props) => {
  const { label, id, selected, onChange, name } = props;

  const handleChange = (event) => {
    const { checked } = event.target;
    onChange(checked);
  };

  return (
    <React.Fragment>
      <Form.Check
        label={label}
        name={name}
        id={id}
        value={selected}
        defaultChecked={selected}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

CheckboxField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

CheckboxField.defaultProps = {
  id: '',
  label: '',
  name: '',
};

export default CheckboxField;
