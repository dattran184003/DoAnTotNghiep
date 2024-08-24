import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./chart.scss";

const Chart = ({ aspect, title }) => {
  const [monthlyRevenues, setMonthlyRevenues] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchMonthlyRevenues = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7175/api/DepositContracts/statistics/12month/year?year=${year}`
        );
        setMonthlyRevenues(response.data);
      } catch (error) {
        console.error("Error fetching monthly revenues:", error);
      }
    };

    fetchMonthlyRevenues();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <label>Nhập số năm muốn tìm: </label>
      <input
        type="number"
        value={year}
        onChange={handleYearChange}
        className="year-input"
        min="2020"
        max={new Date().getFullYear()}
        placeholder="Nhập năm"
      />
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={monthlyRevenues.map((revenue, index) => ({
            name: index + 1, // Index + 1 để bắt đầu từ tháng 1
            Total: revenue,
          }))}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
