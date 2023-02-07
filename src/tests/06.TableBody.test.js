import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { initialEntries, initialState, MOCK_EXPENSE } from './helpers/mocks';

import App from '../App';
import { addExpense } from '../redux/actions/index';

describe('6 - Realiza os testes do componente TableBody', () => {
  it('a tabela é alimentada com dados corretamente', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const { value, description, currency, method, tag } = MOCK_EXPENSE;

    screen.queryByText(/^valor$/i).value = value;
    screen.queryByText(/^descrição$/i).value = description;
    screen.queryByText(/^moeda$/i).value = currency;
    screen.queryByText(/^método de pagamento$/i).value = method;
    screen.queryByText(/^tag$/i).value = tag;

    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    act(() => {
      userEvent.click(addButton);
      store.dispatch(addExpense(MOCK_EXPENSE));
    });

    expect(screen.queryAllByRole('row')).toHaveLength(2);
    expect(screen.queryByRole('cell', { name: /100.00/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /teste/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /doge/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /cartão de crédito/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /lazer/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /^real$/i })).toBeInTheDocument();
  });
});
