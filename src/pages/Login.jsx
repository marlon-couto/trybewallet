import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import { addEmail } from '../redux/actions/index';

import LoginForm from '../components/LoginForm';

function Login({ dispatch }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const validateEmail = (value) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    const minimumLength = 6;
    return value.length >= minimumLength;
  };

  useEffect(() => {
    const isValid = validateEmail(form.email) && validatePassword(form.password);

    if (isValid) {
      setDisabled(false);
    }
  }, [form]);

  const handleChange = ({ target: { name, value } }) => {
    setDisabled(true);
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addEmail(form.email));
    history.push('/carteira');
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm
        form={ form }
        disabled={ disabled }
        handleChange={ handleChange }
        handleSubmit={ handleSubmit }
      />
    </div>
  );
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;
