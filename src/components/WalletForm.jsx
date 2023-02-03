import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from './form/Input';
import Select from './form/Select';
import SubmitButton from './form/SubmitButton';

import { fetchCurrencies, addExpense, editExpense } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const URL = 'https://economia.awesomeapi.com.br/json/all';

export default function WalletForm() {
  const [expense, setExpense] = useState(INITIAL_STATE);

  const expenses = useSelector((state) => state.wallet.expenses);
  const editor = useSelector((state) => state.wallet.editor);
  const idToEdit = useSelector((state) => state.wallet.idToEdit);
  const currencies = useSelector((state) => state.wallet.currencies);

  const dispatch = useDispatch();

  useEffect(() => {
    if (editor) {
      const expenseToEdit = expenses.find(({ id }) => id === idToEdit);
      setExpense(expenseToEdit);
    }
  }, [editor, expenses, idToEdit]);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setExpense({ ...expense, [name]: value });
  };

  const fetchAsks = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      return data;
    } catch (error) {
      return error.message;
    }
  };

  const createExpense = async () => {
    const asks = await fetchAsks(URL);
    const newExpense = { ...expense, id: expenses.length, exchangeRates: asks };

    dispatch(addExpense(newExpense));
    setExpense(INITIAL_STATE);
  };

  const patchExpense = async () => {
    dispatch(editExpense({ ...expense }));
    setExpense(INITIAL_STATE);
  };

  return (
    <form>
      <Input
        text="Valor: "
        type="text"
        name="value"
        dataTestId="value-input"
        value={ expense.value }
        handleChange={ ({ target }) => handleChange({ target }) }
      />

      <Input
        text="Descrição: "
        type="text"
        name="description"
        dataTestId="description-input"
        value={ expense.description }
        handleChange={ ({ target }) => handleChange({ target }) }
      />

      <Select
        handleChange={ handleChange }
        text="Moeda: "
        value={ expense.currency }
        options={ currencies }
        dataTestId="currency-input"
        name="currency"
      />

      <Select
        handleChange={ handleChange }
        text="Método de pagamento: "
        value={ expense.method }
        options={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
        dataTestId="method-input"
        name="method"
      />

      <Select
        handleChange={ handleChange }
        text="Categoria da despesa: "
        value={ expense.tag }
        options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
        dataTestId="tag-input"
        name="tag"
      />

      {!editor ? (
        <SubmitButton
          disabled={ false }
          text="Adicionar despesa"
          handleClick={ () => createExpense() }
        />
      ) : (
        <SubmitButton
          disabled={ false }
          text="Editar despesa"
          handleClick={ () => patchExpense() }
        />
      )}
    </form>
  );
}
