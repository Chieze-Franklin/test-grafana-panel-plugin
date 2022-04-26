import { PanelData } from '@grafana/data';
import { ChartData } from './types';

export type Result = {
  data: ChartData;
  minValue: number;
  maxValue: number;
};

export const constructChartData: (data: PanelData) => Result = (data: PanelData) => {
  const dataFrame = data.series[0];

  const result: ChartData = [];
  let minValue = 0;
  let maxValue = 0;

  const fields = dataFrame.fields;
  const metricField = fields.find((f) => f.name === 'metric');
  const timeField = fields.find((f) => f.name === 'time');
  const valueField = fields.find((f) => f.name === 'value');

  if (metricField?.values && timeField?.values && valueField?.values) {
    // the metrics are cummulative
    // so ignore the first (start from index 1)
    // to get each value: currentVal - prevVal
    for (let i = 1; i < metricField?.values.length; i++) {
      const metric: string = metricField?.values.get(i);
      const time: number = timeField?.values.get(i);
      const currValue: number = valueField?.values.get(i);
      const prevValue: number = valueField?.values.get(i - 1);
      const value = Math.max(currValue - prevValue, 0);

      minValue = Math.min(minValue, value);
      maxValue = Math.max(maxValue, value);

      if (currValue - prevValue < 0) {
        console.log('>>>>>>>>>>>less than zero');
        console.log({ metric, time: new Date(time), currValue, prevValue });
      }

      let line = result.find((l) => l.name === metric);
      if (line) {
        line.points.push({
          x: new Date(time),
          y: value,
        });
      } else {
        line = {
          name: metric,
          color: `rgb(${Math.floor(Math.random() * 125) + 130}, ${Math.floor(Math.random() * 125) + 130}, ${
            Math.floor(Math.random() * 125) + 130
          })`,
          points: [
            {
              x: new Date(time),
              y: value,
            },
          ],
        };
        result.push(line);
      }
    }
  }

  console.log('>>>>>>>>>>result');
  console.log(result);

  return { data: result, minValue, maxValue };
};
