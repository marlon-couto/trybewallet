import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from './form/Input';
import Select from './form/Select';
import SubmitButton from './form/Button';
import fetchApi from '../helpers/fetchApi';
import { addExpense, editExpense } from '../redux/actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

export default function WalletForm() {
  const [expense, setExpense] = useState(INITIAL_STATE);
  const dispatch = useDispatch();

  // Busca as informações do estado global
  const { currencies, expenses, editor, idToEdit } = useSelector(
    ({ wallet }) => wallet,
  );

  /* Caso uma das variáveis abaixo mude e o editor seja true,
  atualiza o estado com os dados da despesa a ser editada
  Caso contrário, mantém o estado com os dados iniciais */
  useEffect(() => {
    if (editor) {
      const expenseToEdit = expenses.find(({ id }) => id === idToEdit);
      setExpense(expenseToEdit);
    }
  }, [editor, expenses, idToEdit]);

  const handleChange = ({ target: { name, value } }) => {
    setExpense({ ...expense, [name]: value });
  };

  // Permite que o usuário adicione uma nova despesa
  const createExpense = async () => {
    const data = await fetchApi();
    const newExpense = { ...expense, id: expenses.length, exchangeRates: data };

    dispatch(addExpense(newExpense));
    setExpense(INITIAL_STATE);
  };

  // Permite que o usuário edite uma despesa
  const patchExpense = async () => {
    dispatch(editExpense(expense));
    setExpense(INITIAL_STATE);
  };

  return (
    <form>
      <Input
        text="Valor: "
        type="number"
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

      {/* Caso editor seja true, altera o botão para "Editar despesa" */}
      {!editor ? (
        <SubmitButton
          text="Adicionar despesa"
          handleClick={ () => createExpense() }
        />
      ) : (
        <SubmitButton
          text="Editar despesa"
          handleClick={ () => patchExpense() }
        />
      )}
    </form>
  );
}
