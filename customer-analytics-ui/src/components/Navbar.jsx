import { useState } from "react";
import "../styles/navbar.css";
import { useTheme } from "../context/ThemeContext";
import { FaBell } from "react-icons/fa";
import { getActivities } from "../services/activityService";
import NotificationPanel from "./NotificationPanel";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  
  const notificationCount = getActivities().length;

  return (
    <nav className="navbar">
      <h2>Customer Analytics</h2>

      <div className="navbar-right">
<div
    className="notification"
    onClick={() => setShowNotifications(!showNotifications)}
    style={{ cursor: "pointer", position: "relative" }}
>
    <FaBell />

    <span className="notification-count">
        {notificationCount}
    </span>

    {showNotifications && <NotificationPanel />}
</div>

        <div className="user-profile">
          <div className="avatar">
            R
          </div>

          <div className="user-info">
            <h4>Rekha</h4>
            <span>Administrator</span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="theme-btn"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;