import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieCharts = () => {
  return (
    <ResponsiveContainer width={"99%"} height={300}>
      <PieChart>
        <Tooltip
          contentStyle={{
            background: "black",
            borderRadius: "5px",
            height: "20px",
            width: "200px",
          }}
        />
        <Pie
          data={data}
          innerRadius={"30%"}
          outerRadius={"50%"}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    /*
      https://recharts.org/en-US/examples/PieChartWithPaddingAngle --> Biblioteca que foi usada para fazer o charts
      https://youtu.be/fq7k_gVV5x8?si=qwHpMff8RI8sARe6&t=4495 --> video no qual o cara usa o chart
    */
  );
};

export default PieCharts;
