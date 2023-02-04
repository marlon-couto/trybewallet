import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { VALID_EMAIL, INVALID_EMAIL, VALID_PASSWORD, INVALID_PASSWORD } from './helpers/mocks';

import App from '../App';

describe('1 - Realiza os testes no componente Login', () => {
  it('renderiza a página de Login na rota "/"', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.queryByText('Login')).toBeInTheDocument();
  });

  it('renderiza o campo "Email" na tela de login', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.queryByLabelText(/email/i);

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('data-testid', 'email-input');
  });

  it('renderiza o campo "Senha" na tela de login', () => {
    renderWithRouterAndRedux(<App />);

    const passwordInput = screen.queryByLabelText(/senha/i);

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('data-testid', 'password-input');
  });

  it('renderiza o botão "Entrar" na tela de login', () => {
    renderWithRouterAndRedux(<App />);

    expect(
      screen.queryByRole('button', { name: /entrar/i }),
    ).toBeInTheDocument();
  });

  it('renderiza o botão "Entrar" desabilitado se o email ou a senha não estiverem preenchidos', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.queryByRole('button', { name: /entrar/i })).toBeDisabled();
  });

  it('o email e a senha precisam estar em um formato válido', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.queryByLabelText(/email/i);
    const passwordInput = screen.queryByLabelText(/senha/i);
    const submitButton = screen.queryByRole('button', { name: /entrar/i });

    const testCases = [
      { email: VALID_EMAIL, password: INVALID_PASSWORD },
      { email: INVALID_EMAIL, password: VALID_PASSWORD },
      { email: INVALID_EMAIL, password: INVALID_PASSWORD },
    ];

    testCases.forEach(({ email, password }) => {
      userEvent.type(emailInput, email);
      userEvent.type(passwordInput, password);

      expect(submitButton).toBeDisabled();

      userEvent.clear(emailInput);
      userEvent.clear(passwordInput);
    });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);

    expect(submitButton).toBeEnabled();
  });

  it('salva o email no estado global após o login', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.queryByLabelText(/email/i), VALID_EMAIL);
    userEvent.type(screen.queryByLabelText(/senha/i), VALID_PASSWORD);
    userEvent.click(screen.queryByRole('button', { name: /entrar/i }));

    expect(store.getState().user.email).toBe(VALID_EMAIL);
  });

  it('redireciona para a rota "/carteira" após o login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(screen.queryByLabelText(/email/i), VALID_EMAIL);
    userEvent.type(screen.queryByLabelText(/senha/i), VALID_PASSWORD);
    userEvent.click(screen.queryByRole('button', { name: /entrar/i }));

    expect(history.location.pathname).toBe('/carteira');
  });
});
