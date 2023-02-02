import React from 'react';
import { useSelector } from 'react-redux';

export default function Table() {
  const expenses = useSelector((state) => state.wallet.expenses);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map(
          ({
            value,
            description,
            currency,
            method,
            tag,
            id,
            exchangeRates,
          }) => (
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
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}
