import PropTypes from 'prop-types';
import React from 'react';

export default function EditButton({ text, dataTestId, handleClick }) {
  return (
    <button
      data-testid={ dataTestId }
      onClick={ handleClick }
      type="button"
    >
      {text}
    </button>
  );
}

EditButton.propTypes = {
  dataTestId: PropTypes.string,
  handleClick: PropTypes.func,
  text: PropTypes.string,
}.isRequired;
