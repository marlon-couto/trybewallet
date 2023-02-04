import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import fetchApi from '../helpers/fetchApi';
import mockData from './helpers/mockData';

import App from '../App';

const initialState = {
  wallet: {
    currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

describe('3 - Realiza os testes no componente WalletForm', () => {
  const initialEntries = ['/carteira'];

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
    expect(global.fetch).toHaveBeenCalledWith(
      'https://economia.awesomeapi.com.br/json/all',
    );
    expect(data).toEqual(mockData);
  });

  it('o estado global é um array com as moedas retornadas pela API, sem a opção "USDT"', async () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const storeCurrencies = store.getState().wallet.currencies;

    expect(Array.isArray(storeCurrencies)).toBe(true);
    expect(storeCurrencies).toHaveLength(15);
    expect(storeCurrencies.includes('USDT')).toBe(false);
  });

  it('os valores das options do campo de Moedas são preenchidas com as moedas vindas do estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries,
      initialState,
    });

    const storeCurrencies = store.getState().wallet.currencies;

    storeCurrencies.forEach((currency) => {
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
