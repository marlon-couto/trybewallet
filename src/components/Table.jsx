import React from 'react';
import TableHead from './table/TableHead';
import TableBody from './table/TableBody';

// Renderiza a tabela de gastos
export default function Table() {
  return (
    <table>
      <TableHead />
      <TableBody />
    </table>
  );
}
