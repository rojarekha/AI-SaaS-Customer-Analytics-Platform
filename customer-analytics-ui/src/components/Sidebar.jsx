import "../styles/sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};
  return (
    <div className="sidebar">

<p
    className={location.pathname === "/dashboard" ? "active" : ""}
    onClick={() => navigate("/dashboard")}
>
    Dashboard
</p>

<p
    className={location.pathname === "/customers" ? "active" : ""}
    onClick={() => navigate("/customers")}
>
    Customers
</p>

<p
    className={location.pathname === "/analytics" ? "active" : ""}
    onClick={() => navigate("/analytics")}
>
    Analytics
</p>

<button
    onClick={handleLogout}
    style={{
        marginTop: "30px",
        width: "100%",
        padding: "10px",
        backgroundColor: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }}
>
    Logout
</button>

    </div>
  );
}

export default Sidebar;