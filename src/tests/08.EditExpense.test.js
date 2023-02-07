import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import {
  initialStateEmpty,
  initialStateFilled,
  initialEntries,
  MOCK_EXPENSE,
} from './helpers/mocks';

import App from '../App';
import { editExpense, addExpense } from '../redux/actions';

describe('8 - Realiza os testes ao tentar editar uma despesa', () => {
  it('renderiza um botão com o data-testid="edit-btn"', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState: initialStateEmpty,
    });

    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation((expense) => [expense, jest.fn()]);
    useStateMock.mockImplementation(() => [MOCK_EXPENSE, jest.fn()]);

    act(() => {
      userEvent.click(screen.queryByText(/adicionar despesa/i));
      store.dispatch(addExpense(MOCK_EXPENSE));
    });

    expect(screen.queryByTestId(/edit-btn/i)).toBeInTheDocument();
  });

  it('exibe o formulário de edição ao clicar no botão de editar', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState: initialStateEmpty,
    });

    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation((expense) => [expense, jest.fn()]);
    useStateMock.mockImplementation(() => [MOCK_EXPENSE, jest.fn()]);

    act(() => {
      userEvent.click(screen.queryByText(/adicionar despesa/i));
      store.dispatch(addExpense(MOCK_EXPENSE));
    });

    act(() => {
      userEvent.click(screen.queryByTestId(/edit-btn/i));
    });

    expect(screen.queryByText(/editar despesa/i)).toBeInTheDocument();
    expect(screen.queryByText(/adicionar despesa/i)).not.toBeInTheDocument();
  });

  it('atualiza o valor total e a lista de despesas ao editar uma despesa', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState: initialStateFilled,
    });

    expect(screen.queryByText(/100.00/i)).toBeInTheDocument();

    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation((expense) => [expense, jest.fn()]);
    useStateMock.mockImplementation(() => [MOCK_EXPENSE, jest.fn()]);

    act(() => {
      userEvent.click(screen.queryByTestId(/edit-btn/i));
    });

    act(() => {
      userEvent.click(screen.queryByText(/editar despesa/i));
      store.dispatch(editExpense({ ...MOCK_EXPENSE, value: '200' }));
    });

    expect(screen.queryByText(/200.00/i)).toBeInTheDocument();
  });

  it.skip('atualiza o estado global ao editar uma despesa', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState: initialStateFilled,
    });

    const { expenses } = store.getState().wallet;
    expect(expenses[0].value).toBe('100');

    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation((expense) => [expense, jest.fn()]);
    useStateMock.mockImplementation(() => [MOCK_EXPENSE, jest.fn()]);

    act(() => {
      userEvent.click(screen.queryByTestId(/edit-btn/i));
    });

    act(() => {
      userEvent.click(screen.queryByText(/editar despesa/i));
      store.dispatch(editExpense({ ...MOCK_EXPENSE, value: '200' }));
    });

    expect(expenses[0].value).toBe('200');
  });

  it.todo('exibe a despesa na mesma posição que estava anteriormente');
});
