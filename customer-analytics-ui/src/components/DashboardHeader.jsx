import { useEffect, useState } from "react";
import "../styles/dashboardHeader.css";

function DashboardHeader() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hour = dateTime.getHours();

    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    }

    return (
        <div className="dashboard-header">
            <div>
                <h1>👋 {greeting}</h1>
                <p>Welcome back to Customer Analytics Dashboard</p>
            </div>

            <div className="header-time">
                <h3>{dateTime.toLocaleDateString()}</h3>
                <p>{dateTime.toLocaleTimeString()}</p>
            </div>
        </div>
    );
}

export default DashboardHeader;