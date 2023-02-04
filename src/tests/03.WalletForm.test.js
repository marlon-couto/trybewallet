import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { initialEntries, initialState } from './helpers/mocks';
import mockData from './helpers/mockData';

import App from '../App';
import fetchApi from '../helpers/fetchApi';

describe('3 - Realiza os testes no componente WalletForm', () => {
  it('renderiza um campo para adicionar o valor da despesa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    expect(screen.queryByTestId('value-input')).toBeInTheDocument();
  });

  it('renderiza um campo para adicionar a descrição da despesa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    expect(screen.queryByTestId('description-input')).toBeInTheDocument();
  });

  it('renderiza um campo para selecionar a moeda da despesa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    expect(screen.queryByTestId('currency-input').tagName).toBe('SELECT');
  });

  it('renderiza um campo para selecionar o método de pagamento da despesa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    expect(screen.queryByTestId('method-input').tagName).toBe('SELECT');
  });

  it('renderiza um campo para selecionar a tag da despesa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });
    expect(screen.queryByTestId('tag-input').tagName).toBe('SELECT');
  });

  it('é feita uma requisição das "currencies" à API no endpoint correto', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    const data = await fetchApi();

    expect(global.fetch).toHaveBeenCalled();
    expect(data).toEqual(mockData);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://economia.awesomeapi.com.br/json/all',
    );
  });

  it('o estado global é um array com as moedas retornadas pela API, sem a opção "USDT"', async () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const { currencies } = store.getState().wallet;

    expect(Array.isArray(currencies)).toBe(true);
    expect(currencies).toHaveLength(15);
    expect(currencies.includes('USDT')).toBe(false);
  });

  it('os valores das options do campo de Moedas são preenchidas com as moedas vindas do estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const { currencies } = store.getState().wallet;

    currencies.forEach((currency) => {
      expect(
        screen.queryByRole('option', { name: currency }),
      ).toBeInTheDocument();
    });
  });

  it('os valores das options do campo de Método de pagamento são preenchidas com as opções certas', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    methods.forEach((method) => {
      expect(
        screen.queryByRole('option', { name: method }),
      ).toBeInTheDocument();
    });
  });

  it('os valores das options do campo de Categoria são preenchidas com as opções certas', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    tags.forEach((tag) => {
      expect(screen.queryByRole('option', { name: tag })).toBeInTheDocument();
    });
  });
});
