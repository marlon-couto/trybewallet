import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from './form/Input';
import Select from './form/Select';

import { fetchCurrencies } from '../redux/actions';

export default function WalletForm() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const currencies = useSelector((state) => state.wallet.currencies);

  const [expense, setExpense] = useState({
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setExpense({ ...expense, [name]: value });
  };

  return (
    <form onSubmit={ () => {} }>
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
    </form>
  );
}
