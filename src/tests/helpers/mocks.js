import mockData from './mockData';

export const VALID_EMAIL = 'email@teste.com';
export const VALID_PASSWORD = '123456';
export const INVALID_EMAIL = 'emailinvalido';
export const INVALID_PASSWORD = '123';

export const MOCK_EXPENSE = {
  value: '100',
  description: 'Teste',
  currency: 'DOGE',
  method: 'Cartão de crédito',
  tag: 'Lazer',
  id: 0,
  exchangeRates: mockData,
};

export const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  id: 0,
  exchangeRates: {},
};

export const initialEntries = ['/carteira'];

export const initialState = {
  wallet: {
    currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};
