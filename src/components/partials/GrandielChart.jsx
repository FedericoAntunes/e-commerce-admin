import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
  LineChart,
  linearGradient,
  AreaChart,
  Area,
} from "recharts";

export default function GrandielChart() {
  const data = [
    {
      name: "Feb 1",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb 2",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Feb 3",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Feb 4",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Feb 5",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Feb 6",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Feb 7",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const toDolar = (decimal, fixed = 0) => `$ ${decimal.toFixed()}`;

  const renderTooltipContent = (o) => {
    const { payload } = o;

    return (
      <div className=" customized-tooltip-content border border-black shadow-xl p-2 rounded bg-white">
        <ul className="list">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: $ ${entry.value}`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <>
      <AreaChart
        width={1000}
        height={500}
        data={data}
        margin={{ top: 50, right: 100, left: 50, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Legend verticalAlign="top" height={36} />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={toDolar} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={renderTooltipContent} />
        <Area
          name="Revenue"
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          name="Revenue (Last period)"
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </>
  );
}
