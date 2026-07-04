import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
import "../styles/analytics.css";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function DashboardChart({ customers = [] }) {
  const { theme } = useTheme();

const isDark = theme === "dark";

const textColor = isDark ? "#ffffff" : "#111827";

const gridColor = isDark
  ? "rgba(255,255,255,0.08)"
  : "rgba(0,0,0,0.08)";




  const data = {
    labels: customers.map((customer) => customer.name),

    datasets: [
      {
        label: "Total Spending",
        data: customers.map((customer) => customer.totalSpending),
        backgroundColor: "#3B82F6",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      title: {
        display: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  const cityCounts = {};

  customers.forEach((customer) => {
    cityCounts[customer.city] =
      (cityCounts[customer.city] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(cityCounts),

    datasets: [
      {
        data: Object.values(cityCounts),

        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#14B8A6",
          "#EC4899",
          "#06B6D4",
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: textColor,
          padding: 20,
          boxWidth: 14,
        },
      },
    },
  };

  return (
    <div className="chart-section">
      <div className="chart-card">
        <h2 className="chart-title">📊 Customer Spending</h2>

        <div style={{ height: "360px" }}>
          <Bar data={data} options={options} />
        </div>
      </div>

      <div className="chart-card">
        <h2 className="chart-title">🌍 Customers by City</h2>

        <div
          style={{
            width: "280px",
            height: "280px",
            margin: "0 auto",
          }}
        >
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;