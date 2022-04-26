import { ChartData } from 'chart/types';
import React from 'react';

export interface LegendProps {
  data: ChartData;
  selectedItems: string[];
  onChange: (value: string) => void;
}

const Legend = ({ data, selectedItems, onChange }: LegendProps) => (
  <div className="legendContainer">
    {data.map((line) => (
      <div className="checkbox" style={{ color: line.color }} key={line.name}>
        <input
          type="checkbox"
          value={line.name}
          checked={selectedItems.includes(line.name)}
          onChange={() => onChange(line.name)}
        />
        <label>{line.name}</label>
      </div>
    ))}
  </div>
);

export default Legend;
