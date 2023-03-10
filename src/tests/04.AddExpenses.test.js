import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import {
  initialEntries,
  initialStateEmpty as initialState,
  MOCK_EXPENSE,
} from './helpers/mocks';

import App from '../App';
import { addExpense } from '../redux/actions';

describe('4 - Realiza os testes ao tentar adicionar uma despesa', () => {
  const textButton = /adicionar despesa/i;

  it('renderiza um botão no formulário com o texto "Adicionar despesa"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    expect(screen.queryByText(textButton)).toBeInTheDocument();
  });

  it('atualiza o estado global com os valores do formulário após o clique no botão "Adicionar despesa"', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const valueInput = screen.queryByTestId(/value-input/i);
    const descriptionInput = screen.queryByTestId(/description-input/i);
    const currencyInput = screen.queryByTestId(/currency-input/i);
    const methodInput = screen.queryByTestId(/method-input/i);
    const tagInput = screen.queryByTestId(/tag-input/i);
    const addButton = screen.queryByText(textButton);

    const { value, description, currency, method, tag } = MOCK_EXPENSE;

    valueInput.value = value;
    descriptionInput.value = description;
    currencyInput.value = currency;
    methodInput.value = method;
    tagInput.value = tag;

    userEvent.click(addButton);
    store.dispatch(addExpense(MOCK_EXPENSE));

    const { expenses } = store.getState().wallet;

    expect(expenses).toHaveLength(1);
    expect(expenses[0].value).toBe(value);
    expect(expenses[0].description).toBe(description);
    expect(expenses[0].currency).toBe(currency);
    expect(expenses[0].method).toBe(method);
    expect(expenses[0].tag).toBe(tag);
  });

  it('atribui à cada despesa um id numérico sequencial que inicia em 0', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const valueInput = screen.queryByTestId(/value-input/i);
    const descriptionInput = screen.queryByTestId(/description-input/i);
    const currencyInput = screen.queryByTestId(/currency-input/i);
    const methodInput = screen.queryByTestId(/method-input/i);
    const tagInput = screen.queryByTestId(/tag-input/i);
    const addButton = screen.queryByText(textButton);

    const { value, description, currency, method, tag } = MOCK_EXPENSE;

    valueInput.value = value;
    descriptionInput.value = description;
    currencyInput.value = currency;
    methodInput.value = method;
    tagInput.value = tag;

    act(() => {
      userEvent.click(addButton);
      store.dispatch(addExpense(MOCK_EXPENSE));
    });

    expect(store.getState().wallet.expenses[0].id).toBe(0);
  });

  it.todo(
    'faz uma requisição à API quando o botão de "Adicionar despesa" é clicado',
  );

  it.todo('atualiza o Header corretamente com o valor total das despesas');

  it('limpa o formulário após o clique no botão "Adicionar despesa"', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const valueInput = screen.queryByTestId('value-input');
    const descriptionInput = screen.queryByTestId('description-input');
    const currencyInput = screen.queryByTestId('currency-input');
    const methodInput = screen.queryByTestId('method-input');
    const tagInput = screen.queryByTestId('tag-input');
    const addButton = screen.queryByText(textButton);

    const { value, description, currency, method, tag } = MOCK_EXPENSE;

    valueInput.value = value;
    descriptionInput.value = description;
    currencyInput.value = currency;
    methodInput.value = method;
    tagInput.value = tag;

    act(() => {
      userEvent.click(addButton);
      store.dispatch(addExpense(MOCK_EXPENSE));
    });

    expect(valueInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    expect(currencyInput.value).toBe('USD');
    expect(methodInput.value).toBe('Dinheiro');
    expect(tagInput.value).toBe('Alimentação');
  });
});
