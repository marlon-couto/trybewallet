import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import EditButton from './EditButton';
import { deleteExpense } from '../../redux/actions/index';

export default function TableBody() {
  const expenses = useSelector((state) => state.wallet.expenses);
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
              <EditButton
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
