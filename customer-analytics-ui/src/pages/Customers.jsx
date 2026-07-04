import { useState } from "react";

import AddCustomer from "../components/AddCustomer";
import CustomerTable from "../components/CustomerTable";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Customers() {

    const [refresh, setRefresh] = useState(false);

    const handleCustomerAdded = () => {
        setRefresh(!refresh);
    };

return (
    <>
        <Navbar />

        <div className="dashboard-container">

            <Sidebar />

            <div className="dashboard-content">

                <AddCustomer
                    onCustomerAdded={handleCustomerAdded}
                />

                <CustomerTable
                    refresh={refresh}
                />

            </div>

        </div>

    </>
);
}

export default Customers;