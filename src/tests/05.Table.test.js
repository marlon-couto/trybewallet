import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { initialEntries } from './helpers/mocks';

import App from '../App';

describe('5 - Realiza os testes do componente Table', () => {
  it('renderiza a tabela com sucesso', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    expect(
      screen.queryByRole('columnheader', { name: /descrição/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /tag/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /método de pagamento/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /^valor$/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /^moeda$/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /câmbio utilizado/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /valor convertido/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /moeda de conversão/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('columnheader', { name: /editar\/excluir/i }),
    ).toBeInTheDocument();
  });
});
