import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { VALID_EMAIL, VALID_PASSWORD, initialEntries } from './helpers/mocks';

import App from '../App';

describe('2 - Realiza os testes no componente Header', () => {
  it('exibe o email da pessoa logada ao renderizar o componente Header', () => {
    renderWithRouterAndRedux(<App />);

    userEvent.type(screen.queryByTestId(/email-input/i), VALID_EMAIL);
    userEvent.type(screen.queryByTestId(/password-input/i), VALID_PASSWORD);
    userEvent.click(screen.queryByRole('button', { name: /entrar/i }));

    const emailField = screen.queryByTestId(/email-field/i);

    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveTextContent(VALID_EMAIL);
  });

  it('exibe a despesa total com valor inicial 0', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    const totalField = screen.queryByTestId(/total-field/i);

    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('0');
  });

  it('exibe o câmbio "BRL", utilizado para conversão de moedas', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    const currencyField = screen.queryByTestId(/header-currency-field/i);

    expect(currencyField).toBeInTheDocument();
    expect(currencyField).toHaveTextContent('BRL');
  });
});
