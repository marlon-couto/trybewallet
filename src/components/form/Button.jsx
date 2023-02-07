import PropTypes from 'prop-types';
import React from 'react';

// Esse componente renderiza um botão com valores dinâmicos
export default function SubmitButton({ disabled, text, handleClick, dataTestId }) {
  return (
    <button
      type="button"
      disabled={ disabled }
      onClick={ handleClick }
      data-testid={ dataTestId }
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  dataTestId: PropTypes.string,
};

SubmitButton.defaultProps = {
  disabled: false,
  dataTestId: '',
};
