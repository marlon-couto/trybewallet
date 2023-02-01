import PropTypes from 'prop-types';
import React from 'react';

import Input from './form/Input';
import SubmitButton from './form/SubmitButton';

export default function LoginForm({
  form,
  disabled,
  handleChange,
  handleSubmit,
}) {
  return (
    <form onSubmit={ (event) => handleSubmit(event) }>
      <Input
        text="Email:"
        type="email"
        name="email"
        dataTestId="email-input"
        value={ form.email }
        handleChange={ handleChange }
      />

      <Input
        text="Senha:"
        type="password"
        name="password"
        dataTestId="password-input"
        value={ form.password }
        handleChange={ handleChange }
      />

      <SubmitButton
        disabled={ disabled }
        text="Entrar"
      />
    </form>
  );
}

LoginForm.propTypes = {
  disabled: PropTypes.bool,
  form: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}.isRequired;
