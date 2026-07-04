import { useEffect, useState } from "react";
import { addCustomer, updateCustomer } from "../services/api";
import { toast } from "react-toastify";
import { saveActivity } from "../services/activityService";
import { FaUser } from "react-icons/fa";
import "../styles/addCustomer.css";

function AddCustomer({ onCustomerAdded,
    selectedCustomer,clearSelection }) {

const [customer, setCustomer] = useState({
    name: "",
    email: "",
    city: "",
    totalSpending: "",
    ordersCount: "",
    image: ""
});
    const [errors, setErrors] = useState({});

    useEffect(() => {

    if (selectedCustomer) {
        setCustomer(selectedCustomer);
    }

}, [selectedCustomer]);

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

 const handleSubmit = (e) => {

    e.preventDefault();
    if (!validate()) {
       return;
    }

    const request = selectedCustomer
        ? updateCustomer(customer.id, customer)
        : addCustomer(customer);

    request
        .then(() => {

                toast.success(
                    selectedCustomer
                        ? "Customer Updated Successfully!"
                        : "Customer Added Successfully!"
                );
                saveActivity({
    type: selectedCustomer ? "UPDATE" : "ADD",
    message: selectedCustomer
        ? `Updated ${customer.name}`
        : `Added ${customer.name}`,
    time: new Date().toISOString()
});

setCustomer({
    name: "",
    email: "",
    city: "",
    totalSpending: "",
    ordersCount: "",
    image: ""
});

            clearSelection();

            onCustomerAdded();

        })
        .catch((err) => {

            console.log("ERROR:", err);

            if (err.response) {
                console.log("Status:", err.response.status);
                console.log("Data:", err.response.data);
                toast.error("Operation failed!");
            } else {
                toast.error(err.message);
            }

        });

};
const validate = () => {

    const newErrors = {};

    if (!customer.name.trim()) {
        newErrors.name = "Name is required";
    }

    if (!customer.email.trim()) {
        newErrors.email = "Email is required";
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)
    ) {
        newErrors.email = "Enter a valid email";
    }

    if (!customer.city.trim()) {
        newErrors.city = "City is required";
    }

    if (
        customer.totalSpending === "" ||
        Number(customer.totalSpending) <= 0
    ) {
        newErrors.totalSpending =
            "Total Spending must be greater than 0";
    }

    if (
        customer.ordersCount === "" ||
        Number(customer.ordersCount) <= 0
    ) {
        newErrors.ordersCount =
            "Orders Count must be greater than 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};

    return (
        <div className="add-customer-card">
        <h2>{selectedCustomer ? "Edit Customer" : "Add New Customer"}
        </h2>

       
<form className="customer-form" onSubmit={handleSubmit}>
<div className="image-upload">

    {customer.image ? (
        <img
            src={customer.image}
            alt="Preview"
            className="preview-image"
        />
    ) : (
<div className="default-avatar">
    <FaUser />
</div>
    )}

    <input
        type="file"
        accept="image/*"
        onChange={(e) => {

            const file = e.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onloadend = () => {
                setCustomer({
                    ...customer,
                    image: reader.result
                });
            };

            reader.readAsDataURL(file);

        }}
    />

</div>
    <input
        type="text"
        name="name"
        placeholder="Customer Name"
        value={customer.name}
        onChange={handleChange}
        className={errors.name ? "error-input" : ""}
    />
    {errors.name && <p className="error-text">{errors.name}</p>}

    <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={customer.email}
        onChange={handleChange}
        className={errors.email ? "error-input" : ""}
    />
    {errors.email && <p className="error-text">{errors.email}</p>}

    <input
        type="text"
        name="city"
        placeholder="City"
        value={customer.city}
        onChange={handleChange}
        className={errors.city ? "error-input" : ""}
    />
    {errors.city && <p className="error-text">{errors.city}</p>}

    <input
        type="number"
        name="totalSpending"
        placeholder="Total Spending"
        value={customer.totalSpending}
        onChange={handleChange}
        className={errors.totalSpending ? "error-input" : ""}
    />
    {errors.totalSpending && (
        <p className="error-text">{errors.totalSpending}</p>
    )}

    <input
        type="number"
        name="ordersCount"
        placeholder="Orders Count"
        value={customer.ordersCount}
        onChange={handleChange}
        className={errors.ordersCount ? "error-input" : ""}
    />
    {errors.ordersCount && (
        <p className="error-text">{errors.ordersCount}</p>
    )}

    <button className="customer-btn" type="submit">
        {selectedCustomer ? "Update Customer" : "Add Customer"}
    </button>

</form>
        </div>

    );
}

export default AddCustomer;