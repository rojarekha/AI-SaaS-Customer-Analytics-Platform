import { useEffect, useState } from "react";
import { exportCustomersToExcel } from "../utils/exportExcel";
import { exportCustomersToPDF } from "../utils/exportPdf";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import CustomerTable from "../components/CustomerTable";
import AddCustomer from "../components/AddCustomer";
import DashboardChart from "../components/DashboardChart";
import DashboardStats from "../components/DashboardStats";

import DashboardHeader from "../components/DashboardHeader";
import RecentCustomers from "../components/RecentCustomers";
import ActivityTimeline from "../components/ActivityTimeline";
import LoadingSpinner from "../components/LoadingSpinner";


import "../styles/dashboard.css";

function Dashboard() {

    const [refresh, setRefresh] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCustomerAdded = () => {
        setRefresh(!refresh);
    };

useEffect(() => {

    setLoading(true);

    api.get("")
        .then((response) => {
            setCustomers(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        });

}, [refresh]);
if (loading) {
    return <LoadingSpinner />;
}  return (
        <>
            <Navbar />
            

            <div className="dashboard-container">

                <Sidebar />

                <div className="dashboard-content">

                    <DashboardHeader />

                    <DashboardCards refresh={refresh} />

                    <div style={{ marginBottom: "20px" }}>
                        <button
                            onClick={() => exportCustomersToExcel(customers)}
        
                            style={{
            
                            padding: "10px 18px",
                            backgroundColor: "#198754",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                         Export Customers
                   </button>
                   <button
                        onClick={() => exportCustomersToPDF(customers)}
                            style={{
                            marginLeft: "10px",
                            padding: "10px 18px",
                            background: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                         }}
                    >
                           📄 Export PDF
                   </button>
                </div>

                    <AddCustomer
                        onCustomerAdded={handleCustomerAdded}
                        selectedCustomer={selectedCustomer}
                        clearSelection={() => setSelectedCustomer(null)}
                    />

                    <CustomerTable
                        refresh={refresh}
                        onEdit={setSelectedCustomer}
                    />
                    <DashboardChart customers={customers} />
                    <DashboardStats customers={customers} />
                    
                    <RecentCustomers customers={customers} />

                    

                </div>

            </div>
        </>
    );
}

export default Dashboard;