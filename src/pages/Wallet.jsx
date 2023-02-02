import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

export default function Wallet() {
  return (
    <div>
      <Header />
      <WalletForm />
      <Table />
    </div>
  );
}
