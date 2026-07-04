import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api, { deleteCustomer } from "../services/api";
import { saveActivity } from "../services/activityService";
import "../styles/table.css";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import {
    toggleFavorite,
    isFavorite
} from "../services/favoriteService";

import CustomerProfile from "./CustomerProfile";

function CustomerTable({ refresh, onEdit }) {

    const [sortOrder, setSortOrder] = useState("asc");
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [cityFilter, setCityFilter] = useState("All");
    const [favoriteFilter, setFavoriteFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    
    
    const [currentPage, setCurrentPage] = useState(1);  
    
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    

    const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
};
    
    const customersPerPage = 5;
const cities = [
    "All",
    ...new Set(customers.map(customer => customer.city))
];

    const fetchCustomers = () => {

        console.log("Request URL:", api.defaults.baseURL + "/");

        setLoading(true);

        api.get("")
            .then((response) => {
                console.log(response.data);
                setCustomers(response.data);
            })
            .catch((error) => {
                console.log(error);
                console.log(error.config?.url);
                console.log(error.response);

                toast.error("Failed to load customers!");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCustomers();
    }, [refresh]);

const handleDelete = async (id) => {

    const result = await Swal.fire({
        title: "Delete Customer?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {

        await deleteCustomer(id);
        const deletedCustomer = customers.find(c => c.id === id);

if (deletedCustomer) {
    saveActivity({
        type: "DELETE",
        message: `Deleted ${deletedCustomer.name}`,
        time: new Date().toISOString()
    });
}

        Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Customer deleted successfully.",
            timer: 1500,
            showConfirmButton: false,
        });

        fetchCustomers();

    } catch (err) {

        Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Unable to delete customer.",
        });

    }

};

const filteredCustomers = customers
    .filter((customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((customer) =>
        cityFilter === "All" || customer.city === cityFilter
    )
    .filter((customer) =>
        favoriteFilter === "All" || isFavorite(customer.id)
    )
.sort((a, b) => {

    if (favoriteFilter === "All") {

        if (isFavorite(a.id) && !isFavorite(b.id)) return -1;

        if (!isFavorite(a.id) && isFavorite(b.id)) return 1;

    }

    if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
    }

    return b.name.localeCompare(a.name);

});

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

    const currentCustomers = filteredCustomers.slice(
        indexOfFirstCustomer,
        indexOfLastCustomer
    );
    const premiumCount = customers.filter(
    c => c.totalSpending >= 5000
).length;

const goldCount = customers.filter(
    c => c.totalSpending >= 2000 && c.totalSpending < 5000
).length;

const silverCount = customers.filter(
    c => c.totalSpending < 2000
).length;

    return (
        <>
        <div className="customer-stats">

    <div className="stat-box premium-box">
        <h4>👑 Premium</h4>
        <h2>{premiumCount}</h2>
    </div>

    <div className="stat-box gold-box">
        <h4>🥈 Gold</h4>
        <h2>{goldCount}</h2>
    </div>

    <div className="stat-box silver-box">
        <h4>🥉 Silver</h4>
        <h2>{silverCount}</h2>
    </div>

</div>

            <input
                type="text"
                className="search-box"
                placeholder="Search customer..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
            />
            <select
                value={cityFilter}
                onChange={(e) => {
                    setCityFilter(e.target.value);
                    setCurrentPage(1);
                }}
                
                style={{
                    marginBottom: "15px",
                    padding: "8px",
                    marginLeft: "10px"
                 }}
            >

                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                 ))}
           </select>


<select
    value={favoriteFilter}
    onChange={(e) => {
        setFavoriteFilter(e.target.value);
        setCurrentPage(1);
    }}
    style={{
        marginBottom: "15px",
        padding: "8px",
        marginLeft: "10px"
    }}
>
    <option value="All">All Customers</option>
    <option value="Favorites">⭐ Favorites</option>
</select>

            {loading && <h3>Loading customers...</h3>}

 <div className="customer-grid">

{currentCustomers.map((customer) => (

<div
    className="customer-card"
    key={customer.id}
    onClick={() => setSelectedCustomer(customer)}
    style={{ cursor: "pointer" }}
>

    <div className="customer-row">

        <div className="customer-left">

<div className="avatar">

    {customer.image ? (

        <img
            src={customer.image}
            alt={customer.name}
            className="customer-avatar-image"
        />

    ) : (

        customer.name.charAt(0).toUpperCase()

    )}

</div>

<div className="customer-info">
    <div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
    }}
>
<FaStar
onClick={(e) => {
    e.stopPropagation();

    toggleFavorite(customer.id);

    fetchCustomers();
}}
    style={{
        color: isFavorite(customer.id)
            ? "#FFD700"
            : "#64748b",
        cursor: "pointer",
        fontSize: "18px",
        transition: "0.3s"
    }}
/>

    <h3>{customer.name}</h3>
</div>

    {customer.totalSpending >= 5000 ? (
        <div className="premium-badge">👑 Premium</div>
    ) : customer.totalSpending >= 2000 ? (
        <div className="gold-badge">🥈 Gold</div>
    ) : (
        <div className="silver-badge">🥉 Silver</div>
    )}

    <p>{customer.email}</p>
    <span>{customer.city}</span>
</div>

        </div>

        <div className="customer-right">

            <div className="customer-price">
                ₹ {customer.totalSpending}
            </div>

            <div className="customer-actions">

                <button
                    className="edit-btn"
                    onClick={() => onEdit(customer)}
                >
                    ✏ Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => handleDelete(customer.id)}
                >
                    🗑 Delete
                </button>

            </div>

        </div>

    </div>

</div>

))}

</div>

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage}
                </span>

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastCustomer >= filteredCustomers.length}
                >
                    Next
                </button>
            </div>
            <CustomerProfile
    customer={selectedCustomer}
    onClose={() => setSelectedCustomer(null)}
/>
        </>
    );
}

export default CustomerTable;