import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/analytics.css";
import { useEffect, useState } from "react";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

function Analytics() {
  const [cityData, setCityData] = useState([]);
  const [spendingData, setSpendingData] = useState([]);

  const [isDark, setIsDark] = useState(
    document.body.classList.contains("dark")
  );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#d0ff42",
    "#AF19FF",
    "#FF4560",
  ];

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("");
      const customers = response.data;

      // Pie Chart
      const cityMap = {};

      customers.forEach((customer) => {
        if (cityMap[customer.city]) {
          cityMap[customer.city]++;
        } else {
          cityMap[customer.city] = 1;
        }
      });

      const chartData = Object.keys(cityMap).map((city) => ({
        name: city,
        value: cityMap[city],
      }));

      setCityData(chartData);

      // Bar & Line Chart
      const spendingChart = customers.map((customer) => ({
        name: customer.name,
        spending: customer.totalSpending,
      }));

      setSpendingData(spendingChart);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "var(--bg)",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          <h1
            style={{
              marginBottom: "25px",
              color: "var(--text)",
            }}
          >
            Analytics Dashboard
          </h1>

          <div className="analytics-grid">

            {/* ---------------- Pie Chart ---------------- */}

            <div className="chart-card">
              <h3>Customers by City</h3>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart key={isDark ? "dark-pie" : "light-pie"}>
                  <Pie
                    data={cityData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value, x, y }) => (
                      <text
                        x={x}
                        y={y}
                        fill={isDark ? "#ffffff" : "#111827"}
                        fontSize={13}
                        textAnchor="middle"
                      >
                        {`${name}: ${value}`}
                      </text>
                    )}
                  >
                    {cityData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: isDark ? "#1f2937" : "#ffffff",
                      color: isDark ? "#ffffff" : "#111827",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                    }}
                  />

                  <Legend
                    formatter={(value) => (
                      <span
                        style={{
                          color: isDark ? "#ffffff" : "#111827",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* ---------------- Bar Chart ---------------- */}

            <div className="chart-card">
              <h3>Total Spending</h3>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  key={isDark ? "dark-bar" : "light-bar"}
                  data={spendingData}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: isDark ? "#ffffff" : "#111827",
                    }}
                  />

                  <YAxis
                    tick={{
                      fill: isDark ? "#ffffff" : "#111827",
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      background: isDark ? "#1f2937" : "#ffffff",
                      color: isDark ? "#ffffff" : "#111827",
                      borderRadius: "10px",
                    }}
                  />

                  <Legend
                    formatter={(value) => (
                      <span
                        style={{
                          color: isDark ? "#ffffff" : "#111827",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />

                  <Bar
                    dataKey="spending"
                    fill="#3b82f6"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ---------------- Line Chart ---------------- */}

            <div className="chart-card full-width">
              <h3>Monthly Spending Trend</h3>

              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  key={isDark ? "dark-line" : "light-line"}
                  data={spendingData}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="name"
                    stroke={isDark ? "#ffffff" : "#111827"}
                    tick={{
                      fill: isDark ? "#ffffff" : "#111827",
                    }}
                  />

                  <YAxis
                    stroke={isDark ? "#ffffff" : "#111827"}
                    tick={{
                      fill: isDark ? "#ffffff" : "#111827",
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      background: isDark ? "#1f2937" : "#ffffff",
                      color: isDark ? "#ffffff" : "#111827",
                      borderRadius: "10px",
                    }}
                  />

                  <Legend
                    formatter={(value) => (
                      <span
                        style={{
                          color: isDark ? "#ffffff" : "#111827",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />

                  <Line
                    type="monotone"
                    dataKey="spending"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;