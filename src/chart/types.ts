export type ChartData = LineData[];

export interface LineData {
  name: string;
  color: string;
  points: Point[];
}

export interface Point {
  x: Date;
  y: number;
}
