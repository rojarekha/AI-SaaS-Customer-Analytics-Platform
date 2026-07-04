import { getActivities } from "../services/activityService";
import "../styles/notificationPanel.css";

function NotificationPanel() {

    const activities = getActivities().slice(0, 5);

    return (

        <div className="notification-panel">

            <h3>Notifications</h3>

            {
                activities.length === 0 ? (

                    <p className="empty-notification">
                        No Notifications
                    </p>

                ) : (

                    activities.map((activity, index) => (

                        <div
                            key={index}
                            className="notification-item"
                        >

                            <div className="notification-icon">

                                {
                                    activity.type === "ADD"
                                        ? "🟢"
                                        : activity.type === "UPDATE"
                                        ? "✏️"
                                        : "🗑️"
                                }

                            </div>

                            <div>

                                <strong>{activity.message}</strong>

                                <p>
                                    {new Date(activity.time).toLocaleString()}
                                </p>

                            </div>

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default NotificationPanel;