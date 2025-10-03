import React from 'react';
import type { ColorPalette } from './data/mockData';

/**
 * Propriedades do componente DataTable.
 * Data é um array genérico, pois será usado para diferentes tipos de tabelas.
 */
interface DataTableProps {
  data: any[];
  title: string;
  color: ColorPalette;
}

/**
 * Componente genérico para renderizar dados em formato de tabela.
 */
export const DataTable: React.FC<DataTableProps> = ({ data, title, color }) => {
  if (data.length === 0) {
    return <p className="text-gray-500 p-4">Nenhum dado para exibir.</p>;
  }

  // Extrai as chaves do primeiro objeto para usar como cabeçalho da tabela
  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto shadow-xl rounded-xl mb-8 border" style={{ backgroundColor: color.surface, borderColor: color.primary }}>
      <h2 className="text-xl font-bold p-4 border-b" style={{ color: color.primary, borderColor: color.background }}>{title}</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead style={{ backgroundColor: color.primary, color: color.surface }}>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {header.toUpperCase().replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-800">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition duration-150'}>
              {headers.map((header) => (
                <td key={`${rowIndex}-${header}`} className="px-6 py-4 whitespace-nowrap text-sm">
                  {/* Formatação especial para datas */}
                  {header.includes('data') && row[header] ? new Date(row[header]).toLocaleDateString('pt-BR') : String(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};