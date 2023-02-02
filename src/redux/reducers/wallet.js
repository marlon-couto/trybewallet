import {
  REQUEST_FAILED,
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
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

  case REQUEST_SUCCESSFUL: {
    return { ...state, loading: false, currencies: action.payload };
  }

  case REQUEST_FAILED: {
    return {
      ...state,
      loading: false,
      errorMessage: action.payload,
      currencies: [],
    };
  }

  default: {
    return state;
  }
  }
};

export default wallet;
