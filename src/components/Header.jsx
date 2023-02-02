import React from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const email = useSelector((state) => state.user.email);
  const expenses = useSelector((state) => state.wallet.expenses);

  const total = expenses.reduce((acc, { value, exchangeRates, currency }) => {
    const exchangeRate = exchangeRates[currency].ask;
    const parsedValue = parseFloat(value) * parseFloat(exchangeRate);

    return acc + parsedValue;
  }, 0);

  return (
    <div>
      <p data-testid="email-field">{email}</p>
      <p data-testid="total-field">{total.toFixed(2)}</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}
