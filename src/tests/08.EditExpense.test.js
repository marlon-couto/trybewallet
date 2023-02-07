import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { initialState, initialEntries } from './helpers/mocks';

import App from '../App';
import { editExpense } from '../redux/actions';

describe('8 - Realiza os testes ao tentar editar uma despesa', () => {
  it.todo('renderiza um botão com o data-testid="edit-btn"');
  it.todo('exibe o formulário de edição ao clicar no botão de editar');
  it.todo('altera o botão "Adicionar despesa" para "Editar despesa"');
  it.todo('atualiza o valor total e a lista de despesas ao editar uma despesa');
  it.todo('atualiza o estado global ao editar uma despesa');
  it.todo('exibe a despesa na mesma posição que estava anteriormente');
});
