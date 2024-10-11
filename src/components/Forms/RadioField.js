import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const RadioField = (label, id, name, value, checked, onChange) => {
  const handleChange = (event) => {
    const { checked } = event.target;
    onChange(checked);
  };

  return (
    <React.Fragment>
      <Form.Check
        type="radio"
        label={label}
        id={id}
        name={name}
        value={checked}
        defaultChecked={checked}
        defaultValue={value}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

RadioField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

RadioField.defaultProps = {
  id: "",
  name: "",
  value: "",
};

export default RadioField;
