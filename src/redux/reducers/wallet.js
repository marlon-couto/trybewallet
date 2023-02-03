import {
  REQUEST_CURRENCIES_SUCCESSFUL,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  OPEN_EDITOR,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_SUCCESSFUL: {
    return { ...state, loading: false, currencies: action.payload };
  }

  case ADD_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }

  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  }

  case OPEN_EDITOR: {
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  }

  case EDIT_EXPENSE: {
    const updatedExpenses = [...state.expenses];
    updatedExpenses[action.payload.id] = action.payload;

    return {
      ...state,
      editor: false,
      expenses: updatedExpenses,
    };
  }

  default: {
    return state;
  }
  }
};

export default wallet;
