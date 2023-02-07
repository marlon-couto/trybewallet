import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { fetchCurrencies } from '../redux/actions';

export default function Wallet() {
  const dispatch = useDispatch();

  // Faz uma requisição à API e atualiza o estado global com as moedas disponíveis
  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <WalletForm />
      <Table />
    </div>
  );
}
