import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const SelectField = ({
  id,
  name,
  value,
  data,
  placeholder,
  onChange,
  field,
}) => {
  const handleChange = (event) => {
    const { value } = event.target;
    if (field) {
      onChange(field, value);
    } else {
      onChange(value);
    }
  };

  return (
    <React.Fragment>
      <Form.Select value={value} name={name} id={id} onChange={handleChange}>
        <option value="">{placeholder}</option>
        {data.map((item, key) => (
          <option key={key} value={item.value}>
            {item.label}
          </option>
        ))}
      </Form.Select>
    </React.Fragment>
  );
};

SelectField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

SelectField.defaultProps = {
  value: "",
  placeholder: "",
};

export default SelectField;
