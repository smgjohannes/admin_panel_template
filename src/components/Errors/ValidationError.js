import React from 'react';

class ValidationError extends React.Component {
  render() {
    console.console.log(this.props.errors);
    return (
      <>
        <ul>
          {Object.keys(this.props.errors).map((error, index) => (
            <li className="text-danger" key={index}>
              {this.props.errors[error][0]}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default ValidationError;
