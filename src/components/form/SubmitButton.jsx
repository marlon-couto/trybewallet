import PropTypes from 'prop-types';
import React from 'react';

export default function SubmitButton({ disabled, text, handleClick }) {
  return (
    <button
      type="button"
      disabled={ disabled }
      onClick={ handleClick }
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
  handleClick: PropTypes.func,
}.isRequired;
