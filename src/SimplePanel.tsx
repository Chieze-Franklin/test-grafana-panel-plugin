import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import MultilineChart from 'components/MultilineChart';
import { constructChartData } from 'chart/data';
import Legend from 'components/Legend';

const dimensions = {
  width: 600,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60,
  },
};

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const { data: chartData, minValue, maxValue } = constructChartData(data);

  const legendData = chartData;
  const filteredChartData = chartData.filter((line) => selectedItems.includes(line.name));

  const onChangeSelection = (name: string) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="App">
      <Legend data={legendData} selectedItems={selectedItems} onChange={onChangeSelection} />
      <MultilineChart data={filteredChartData} dimensions={dimensions} yScaleDomain={[minValue, maxValue]} />
    </div>
  );
};
