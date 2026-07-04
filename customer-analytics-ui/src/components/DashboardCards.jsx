import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/cards.css";

import {
  Users,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

function DashboardCards({ refresh }) {
  const [customerCount, setCustomerCount] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const [averageSpending, setAverageSpending] = useState(0);

  useEffect(() => {
    api.get("/analytics/count")
      .then((res) => setCustomerCount(res.data))
      .catch(() => {});

    api.get("/analytics/total-spending")
      .then((res) => setTotalSpending(res.data))
      .catch(() => {});

    api.get("/analytics/average-spending")
      .then((res) => setAverageSpending(res.data))
      .catch(() => {});
  }, [refresh]);

  return (
    <div className="dashboard-cards">

      <div className="dashboard-card">
        <div className="card-icon">
          <Users size={30} />
        </div>

        <p className="card-title">
          Total Customers
        </p>

        <h2 className="card-value">
          {customerCount}
        </h2>

        <span className="card-change">
          +12% this month
        </span>
      </div>

      <div className="dashboard-card">

        <div className="card-icon">
          <IndianRupee size={30} />
        </div>

        <p className="card-title">
          Total Spending
        </p>

        <h2 className="card-value">
          ₹ {Number(totalSpending).toLocaleString()}
        </h2>

        <span className="card-change">
          +18% this month
        </span>

      </div>

      <div className="dashboard-card">

        <div className="card-icon">
          <TrendingUp size={30} />
        </div>

        <p className="card-title">
          Average Spending
        </p>

        <h2 className="card-value">
          ₹ {Number(averageSpending).toLocaleString()}
        </h2>

        <span className="card-change">
          +5% this month
        </span>

      </div>

    </div>
  );
}

export default DashboardCards;