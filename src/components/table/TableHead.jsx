import React from 'react';

// Renderiza o cabeçalho da tabela
const headers = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

export default function TableHead() {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={ header }>{header}</th>
        ))}
      </tr>
    </thead>
  );
}
