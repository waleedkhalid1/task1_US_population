import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from "recharts";

const PopulationBarChart = ({ data, wrapperStyles }) => {
  return (
      <BarChart width={500} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" stroke="#ffffff" />
        <YAxis stroke="#ffffff" margin={{ bottom: 20 }} />
        <Tooltip />
        <Bar dataKey="population" fill="#8884d8" barSize={10}>
          {data.map((d, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
          ))}
        </Bar>
      </BarChart>
  );
};

export default PopulationBarChart;
