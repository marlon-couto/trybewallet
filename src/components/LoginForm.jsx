import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from './form/Input';
import Button from './form/Button';
import { addEmail } from '../redux/actions/index';

/* Exibe um formulário de login que recebe email e senha da pessoa usuária.
O botão "Entrar" só é habilitado caso o email e a senha sejam válidos. */
export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  // Valida email e senha
  const validateEmail = (value) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    const minimumLength = 6;
    return value.length >= minimumLength;
  };

  // Caso as informações do estado mudem, verifica se o formulário é válido
  useEffect(() => {
    const isValid = validateEmail(form.email) && validatePassword(form.password);

    if (isValid) {
      setDisabled(false);
    }
  }, [form]);

  // Atualiza o estado com os dados digitados nos inputs
  const handleChange = ({ target: { name, value } }) => {
    setDisabled(true);
    setForm({ ...form, [name]: value });
  };

  // Adiciona o email ao estado global e redireciona para a rota "/carteira"
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

      <Button
        disabled={ disabled }
        text="Entrar"
        handleClick={ () => handleSubmit() }
      />
    </form>
  );
}
