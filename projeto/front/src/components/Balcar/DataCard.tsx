import React from 'react';
import type { ColorPalette } from './data/mockData';

/**
 * Propriedades do componente DataCard.
 * Item pode ser qualquer objeto de dados, mas o titleKey define qual campo usar como título.
 */
interface DataCardProps {
  item: any;
  color: ColorPalette;
  titleKey: string;
}

/**
 * Componente Card para exibir dados resumidos ou detalhes.
 */
export const DataCard: React.FC<DataCardProps> = ({ item, color, titleKey }) => {
  // Filtra o campo de título para que ele não se repita na lista de detalhes
  const details = Object.entries(item).filter(([key]) => key !== titleKey);

  return (
    <div className="p-4 rounded-xl shadow-lg border border-gray-100 h-full transform hover:scale-[1.02] transition duration-300" style={{ backgroundColor: color.surface }}>
      <h3 className="text-lg font-semibold mb-2 truncate" style={{ color: color.primary }}>
        {item[titleKey]}
      </h3>
      <div className="space-y-1 text-sm text-gray-600">
        {details.map(([key, value]) => (
          <div key={key} className="flex justify-between items-start">
            <span className="font-medium mr-2 capitalize">{key.replace(/_/g, ' ')}:</span>
            <span className="text-right text-gray-700 font-mono">
              {/* Formatação especial para coordenadas */}
              {typeof value === 'number' && (key === 'lat' || key === 'lng') ? value.toFixed(4) : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
