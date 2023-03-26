import React from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";

const PopulationLineChart = ({ data }) => {
  return (
    <div className="caption">
      <LineChart width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" stroke="#ffffff" />
        <YAxis stroke="#ffffff" margin={{ bottom: 20 }} />
        <Tooltip />
        <Line type="monotone" dataKey="population" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
      <caption>Line Chart</caption>
    </div>
  );
};

export default PopulationLineChart;
