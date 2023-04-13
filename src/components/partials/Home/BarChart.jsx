import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

const data = [
  {
    name: "Feb",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Mar",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Apr",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "May",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Jun",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jul",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Agu",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/tiny-bar-chart-35meb";

  render() {
    return (
      <BarChart
        className="bg-white border border-gray-200 rounded-lg shadow m-4"
        width={800}
        height={500}
        data={data}
        margin={{ top: 20, right: 100, left: 50, bottom: 20 }}
      >
        <Bar dataKey="uv" fill="#8884d8" name="Visitors per month" />
        <Legend verticalAlign="top" height={36} />
        <XAxis dataKey="name" />
        <YAxis dataKey="uv" />
      </BarChart>
    );
  }
}
