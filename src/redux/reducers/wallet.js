const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EMAIL': {
    return { ...state, email: action.payload };
  }

  default: {
    return state;
  }
  }
};

export default wallet;
