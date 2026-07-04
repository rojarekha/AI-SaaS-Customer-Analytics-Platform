import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/customers"
});

// Add JWT automatically
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 403) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export const getCustomers = () => api.get("");

export const addCustomer = (customer) => api.post("", customer);

export const updateCustomer = (id, customer) =>
    api.put(`/${id}`, customer);

export const deleteCustomer = (id) =>
    api.delete(`/${id}`);

export default api;