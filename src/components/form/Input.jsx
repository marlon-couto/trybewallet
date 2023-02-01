import PropTypes from 'prop-types';
import React from 'react';

export default function Input({ text, type, name, dataTestId, value, handleChange }) {
  return (
    <label htmlFor={ name }>
      { text }
      <input
        type={ type }
        name={ name }
        id={ name }
        data-testid={ dataTestId }
        value={ value }
        onChange={ ({ target }) => handleChange({
          target,
        }) }
      />
    </label>
  );
}

Input.propTypes = {
  text: PropTypes.string,
  dataTestId: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}.isRequired;
