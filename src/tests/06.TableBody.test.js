import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';

import {
  initialEntries,
  initialStateEmpty as initialState,
  MOCK_EXPENSE,
} from './helpers/mocks';

import App from '../App';
import { addExpense } from '../redux/actions/index';

describe('6 - Realiza os testes do componente TableBody', () => {
  it('renderiza os dados corretamente na tabela', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation((expense) => [expense, jest.fn()]);
    useStateMock.mockImplementation(() => [MOCK_EXPENSE, jest.fn()]);

    act(() => {
      userEvent.click(
        screen.getByRole('button', {
          name: /adicionar despesa/i,
        }),
      );
      store.dispatch(addExpense(MOCK_EXPENSE));
    });

    expect(screen.queryAllByRole('row')).toHaveLength(2);
    expect(screen.queryByRole('cell', { name: /100.00/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /teste/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /doge/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('cell', { name: /cartão de crédito/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /lazer/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /^real$/i })).toBeInTheDocument();
  });
});
