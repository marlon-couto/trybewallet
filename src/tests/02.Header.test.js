import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';

const VALID_EMAIL = 'email@teste.com';
const VALID_PASSWORD = '123456';

describe('2 - Realiza os testes no componente Header', () => {
  const initialEntries = ['/carteira'];

  it('exibe o email da pessoa logada ao renderizar o componente Header', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.queryByTestId('email-input'), VALID_EMAIL);
    userEvent.type(screen.queryByTestId('password-input'), VALID_PASSWORD);
    userEvent.click(screen.queryByRole('button', { name: /entrar/i }));

    const emailField = screen.queryByTestId('email-field');
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveTextContent(VALID_EMAIL);
  });

  it('exibe a despesa total com valor inicial 0', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    const totalField = screen.queryByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('0');
  });

  it('exibe o câmbio "BRL", utilizado para conversão de moedas', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    const currencyField = screen.queryByTestId('header-currency-field');
    expect(currencyField).toBeInTheDocument();
    expect(currencyField).toHaveTextContent('BRL');
  });
});
