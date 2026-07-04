import Loader from "./Loader";

function DashboardStats({ customers }) {

if (!customers) {
    return <Loader />;
}

if (customers.length === 0) {
    return (
        <div
            style={{
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                color: "#666",
                fontWeight: "bold",
            }}
        >
            📭 No Customers Found
        </div>
    );
}

    const highest = customers.reduce((a, b) =>
        a.totalSpending > b.totalSpending ? a : b
    );

    const lowest = customers.reduce((a, b) =>
        a.totalSpending < b.totalSpending ? a : b
    );

    const averageOrders =
        (
            customers.reduce(
                (sum, c) => sum + Number(c.ordersCount),
                0
            ) / customers.length
        ).toFixed(1);

    const cityCount = {};

    customers.forEach(customer => {
        cityCount[customer.city] =
            (cityCount[customer.city] || 0) + 1;
    });

    const topCity = Object.keys(cityCount).reduce((a, b) =>
        cityCount[a] > cityCount[b] ? a : b
    );

return (
    <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
            marginTop: "35px",
        }}
    >

        <div className="dashboard-card">
            <p className="card-title">Highest Spending</p>
            <h2 className="card-value">{highest.name}</h2>
            <span className="card-change">
                ₹ {highest.totalSpending}
            </span>
        </div>

        <div className="dashboard-card">
            <p className="card-title">Lowest Spending</p>
            <h2 className="card-value">{lowest.name}</h2>
            <span className="card-change">
                ₹ {lowest.totalSpending}
            </span>
        </div>

        <div className="dashboard-card">
            <p className="card-title">Top City</p>
            <h2 className="card-value">{topCity}</h2>
            <span className="card-change">
                {cityCount[topCity]} Customers
            </span>
        </div>

        <div className="dashboard-card">
            <p className="card-title">Average Orders</p>
            <h2 className="card-value">{averageOrders}</h2>
            <span className="card-change">
                Orders
            </span>
        </div>

    </div>
);
}

export default DashboardStats;