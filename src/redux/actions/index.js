export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export const ADD_EMAIL = 'ADD_EMAIL';

export const requestStarted = () => ({ type: REQUEST_STARTED });

export const requestSuccessful = (data) => ({
  type: REQUEST_SUCCESSFUL,
  payload: data,
});

export const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  payload: error,
});

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestStarted());

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');

    dispatch(requestSuccessful(currencies));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};
