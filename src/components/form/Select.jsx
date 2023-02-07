import PropTypes from 'prop-types';
import React from 'react';

// Esse componente renderiza um select com valores dinâmicos
export default function Select({
  name,
  text,
  dataTestId,
  value,
  handleChange,
  options,
}) {
  return (
    <label htmlFor={ name }>
      {text}
      <select
        name={ name }
        id={ name }
        data-testid={ dataTestId }
        value={ value }
        onChange={ ({ target }) => handleChange({
          target,
        }) }
      >
        {options.map((option) => (
          <option
            key={ option }
            value={ option }
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

Select.propTypes = {
  dataTestId: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
}.isRequired;
