import PropTypes from 'prop-types';
import React from 'react';

export default function SubmitButton({ disabled, text }) {
  return (
    <button
      type="submit"
      disabled={ disabled }
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string,
}.isRequired;
