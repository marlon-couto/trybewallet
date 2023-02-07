import {
  REQUEST_CURRENCIES,
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
  const { type, payload } = action;

  switch (type) {
  case REQUEST_CURRENCIES: {
    return { ...state, loading: false, currencies: payload };
  }

  case ADD_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  }

  // Remove a despesa passada no payload do array de despesas
  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== payload),
    };
  }

  // Define o editor como true e o idToEdit como o payload
  case OPEN_EDITOR: {
    return {
      ...state,
      editor: true,
      idToEdit: payload,
    };
  }

  /* 1. Cria uma cópia do array de despesas
  2. Atribui a despesa atualizada na cópia do array de despesas
  3. Retorna o estado com o array de despesas atualizado */
  case EDIT_EXPENSE: {
    const updatedExpenses = state.expenses;

    updatedExpenses[payload.id] = payload;

    return {
      ...state,
      editor: false,
      expenses: [...updatedExpenses],
    };
  }

  default: {
    return state;
  }
  }
};

export default wallet;
