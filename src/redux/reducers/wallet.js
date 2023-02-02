import {
  REQUEST_STARTED,
  REQUEST_CURRENCIES_FAILED,
  REQUEST_CURRENCIES_SUCCESSFUL,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  loading: false,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_STARTED: {
    return { ...state, loading: true, errorMessage: '' };
  }

  case REQUEST_CURRENCIES_SUCCESSFUL: {
    return { ...state, loading: false, currencies: action.payload };
  }

  case REQUEST_CURRENCIES_FAILED: {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload,
      currencies: [],
    };
  }

  case ADD_EXPENSE: {
    return { ...state, expenses: [...state.expenses, action.payload] };
  }

  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  }

  default: {
    return state;
  }
  }
};

export default wallet;
