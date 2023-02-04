import fetchApi from '../../helpers/fetchApi';

export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const OPEN_EDITOR = 'OPEN_EDITOR';

const requestCurrencies = (currencies) => ({
  type: REQUEST_CURRENCIES,
  payload: currencies,
});

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const openEditor = (id) => ({
  type: OPEN_EDITOR,
  payload: id,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  payload: expense,
});

export const fetchCurrencies = () => async (dispatch) => {
  const data = await fetchApi();

  delete data.USDT;
  const currencies = Object.keys(data);

  dispatch(requestCurrencies(currencies));
};
