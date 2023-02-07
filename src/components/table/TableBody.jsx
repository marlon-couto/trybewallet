import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../form/Button';
import { deleteExpense, openEditor } from '../../redux/actions/index';

/* Busca as informações do estado global e renderiza a tabela.
Também permite a edição e deleção de um item da tabela pelos botões
"Editar" e "Excluir". */
export default function TableBody() {
  const expenses = useSelector(({ wallet }) => wallet.expenses);
  const dispatch = useDispatch();

  return (
    <tbody>
      {expenses.map(
        ({ value, description, currency, method, tag, id, exchangeRates }) => (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{parseFloat(value).toFixed(2)}</td>
            <td>{exchangeRates[currency].name}</td>
            <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>
              {parseFloat(value * exchangeRates[currency].ask).toFixed(2)}
              {' '}
            </td>
            <td>Real</td>
            <td>
              <Button
                text="Editar"
                dataTestId="edit-btn"
                handleClick={ () => dispatch(openEditor(id)) }
              />

              <Button
                text="Excluir"
                dataTestId="delete-btn"
                handleClick={ () => dispatch(deleteExpense(id)) }
              />
            </td>
          </tr>
        ),
      )}
    </tbody>
  );
}
