import { useEffect, useState } from "react";
import { getActivities } from "../services/activityService";
import "../styles/activityTimeline.css";

function ActivityTimeline() {
    const [activities, setActivities] = useState([]);

useEffect(() => {
    setActivities(getActivities());
}, []);
    return (
        <div className="activity-container">

            <h2>📋 Recent Activity</h2>

            {activities.length === 0 ? (

    <p style={{ color: "#94a3b8" }}>
        No recent activity.
    </p>

) : (

    activities.map((activity, index) => (

        <div className="activity-item" key={index}>

            <div
                className={`activity-icon ${
                    activity.type === "ADD"
                        ? "add"
                        : activity.type === "UPDATE"
                        ? "edit"
                        : "delete"
                }`}
            >
                {activity.type === "ADD"
                    ? "🟢"
                    : activity.type === "UPDATE"
                    ? "✏️"
                    : "🗑️"}
            </div>

            <div>
                <h4>{activity.message}</h4>

                <p>
                    {new Date(activity.time).toLocaleString()}
                </p>
            </div>

        </div>

    ))

)}

        </div>
    );
}

export default ActivityTimeline;