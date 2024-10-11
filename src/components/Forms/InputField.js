import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

import { validateInput } from '../../utils/Validator';

const InputField = ({ id, name, value, placeholder, validators, type, rows, required, readonly, onChange }) => {
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setError(validateInput(validators, value));
    onChange(value);
  };

  const handleKeyUp = (event) => {
    const { value } = event.target;
    setError(validateInput(validators, value));
  };

  const isInvalid = error ? 'is-invalid' : '';

  return (
    <React.Fragment>
      {type === 'textarea' ? (
        <Form.Control
          as="textarea"
          rows={rows}
          placeholder={placeholder}
          required={required}
          name={name}
          id={id}
          value={value}
          disabled={readonly}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          className={isInvalid}
        />
      ) : (
        <Form.Control
          type={type}
          value={value}
          name={name}
          id={id}
          disabled={readonly}
          required={required}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          className={isInvalid}
        />
      )}
      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </React.Fragment>
  );
};

InputField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  validators: PropTypes.array,
  type: PropTypes.string,
  readonly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  id: '',
  name: '',
  value: '',
  placeholder: '',
  type: 'text',
  readonly: false,
  validators: [],
};

export default InputField;
