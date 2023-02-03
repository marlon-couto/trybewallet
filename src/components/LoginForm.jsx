import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from './form/Input';
import SubmitButton from './form/SubmitButton';

import { addEmail } from '../redux/actions/index';

export default function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);

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

  const handleSubmit = () => {
    dispatch(addEmail(form.email));
    history.push('/carteira');
  };

  return (
    <form>
      <Input
        text="Email: "
        type="email"
        name="email"
        dataTestId="email-input"
        value={ form.email }
        handleChange={ handleChange }
      />

      <Input
        text="Senha: "
        type="password"
        name="password"
        dataTestId="password-input"
        value={ form.password }
        handleChange={ handleChange }
      />

      <SubmitButton
        disabled={ disabled }
        text="Entrar"
        handleClick={ () => handleSubmit() }
      />
    </form>
  );
}
