export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_CURRENCIES_SUCCESSFUL = 'REQUEST_CURRENCIES_SUCCESSFUL';
export const REQUEST_CURRENCIES_FAILED = 'REQUEST_CURRENCIES_SUCCESSFUL';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

const URL = 'https://economia.awesomeapi.com.br/json/all';

const requestStarted = () => ({ type: REQUEST_STARTED });

const requestCurrenciesSuccessful = (currencies) => ({
  type: REQUEST_CURRENCIES_SUCCESSFUL,
  payload: currencies,
});

const requestCurrenciesFailed = (error) => ({
  type: REQUEST_CURRENCIES_FAILED,
  payload: error,
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

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestStarted());

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const currencies = Object.keys(data).filter(
      (currency) => currency !== 'USDT',
    );

    dispatch(requestCurrenciesSuccessful(currencies));
  } catch (error) {
    dispatch(requestCurrenciesFailed(error));
  }
};
