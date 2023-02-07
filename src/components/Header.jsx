import React from 'react';
import { useSelector } from 'react-redux';

// Renderiza o cabeçalho da página, exibindo o email do usuário e o total de gastos
export default function Header() {
  const email = useSelector((state) => state.user.email);
  const expenses = useSelector((state) => state.wallet.expenses);

  // Calcula o total de gastos usando as informações do estado global
  const total = expenses.reduce(
    (accumulator, { value, exchangeRates, currency }) => {
      const exchangeRate = exchangeRates[currency].ask;
      const parsedValue = parseFloat(value) * parseFloat(exchangeRate);

      return accumulator + parsedValue;
    },
    0,
  );

  return (
    <div>
      <p data-testid="email-field">{email}</p>
      <p data-testid="total-field">{total.toFixed(2)}</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}
