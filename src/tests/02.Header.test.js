import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';

const VALID_EMAIL = 'email@teste.com';
const VALID_PASSWORD = '123456';

describe('2 - Realiza os testes no componente Header', () => {
  it('exibe o email da pessoa logada ao renderizar o componente Header', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.getByTestId('email-input'), VALID_EMAIL);
    userEvent.type(screen.getByTestId('password-input'), VALID_PASSWORD);
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    const emailField = screen.getByTestId('email-field');
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveTextContent(VALID_EMAIL);
  });

  it('exibe a despesa total com valor inicial 0', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const totalField = screen.getByTestId('total-field');
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('0');
  });

  it('exibe o câmbio "BRL", utilizado para conversão de moedas', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const currencyField = screen.getByTestId('header-currency-field');
    expect(currencyField).toBeInTheDocument();
    expect(currencyField).toHaveTextContent('BRL');
  });
});
