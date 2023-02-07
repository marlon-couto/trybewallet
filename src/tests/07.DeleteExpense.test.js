import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import {
  initialStateEmpty as initialState,
  initialEntries,
  MOCK_EXPENSE,
} from './helpers/mocks';

import App from '../App';
import { deleteExpense, addExpense } from '../redux/actions';

describe('7 - Realiza os testes ao tentar deletar uma despesa', () => {
  it('renderiza um botão com o data-testid="delete-btn"', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation((expense) => [expense, jest.fn()]);
    useStateMock.mockImplementation(() => [MOCK_EXPENSE, jest.fn()]);

    act(() => {
      userEvent.click(screen.queryByText(/adicionar despesa/i));
      store.dispatch(addExpense(MOCK_EXPENSE));
    });

    expect(screen.queryByTestId(/delete-btn/i)).toBeInTheDocument();
  });

  it('atualiza o valor total e a lista de despesas ao deletar uma despesa', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation((expense) => [expense, jest.fn()]);
    useStateMock.mockImplementation(() => [MOCK_EXPENSE, jest.fn()]);

    act(() => {
      userEvent.click(screen.queryByText(/adicionar despesa/i));
      store.dispatch(addExpense(MOCK_EXPENSE));
    });

    expect(screen.queryByText(/100.00/i)).toBeInTheDocument();
    expect(screen.queryByText(/teste/i)).toBeInTheDocument();

    act(() => {
      userEvent.click(screen.queryByTestId(/delete-btn/i));
      store.dispatch(deleteExpense(MOCK_EXPENSE));
    });

    expect(screen.queryByText(/100.00/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/teste/i)).not.toBeInTheDocument();
  });

  it('atualiza o estado global ao deletar uma despesa', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation((expense) => [expense, jest.fn()]);
    useStateMock.mockImplementation(() => [MOCK_EXPENSE, jest.fn()]);

    act(() => {
      userEvent.click(screen.queryByText(/adicionar despesa/i));
      store.dispatch(addExpense(MOCK_EXPENSE));
    });

    expect(store.getState().wallet.expenses).toHaveLength(1);

    act(() => {
      userEvent.click(screen.queryByTestId(/delete-btn/i));
      store.dispatch(deleteExpense(MOCK_EXPENSE));
    });

    expect(store.getState().wallet.expenses).toHaveLength(0);
  });
});
