import "../styles/recentCustomers.css";

function RecentCustomers({ customers }) {

    const recentCustomers = [...customers]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    return (
        <div className="recent-card">

            <h2>📋 Recent Customers</h2>

{recentCustomers.map((customer) => (

    <div
        key={customer.id}
        className="recent-item"
    >

        <div
            style={{
                display:"flex",
                alignItems:"center",
                gap:"18px"
            }}
        >

            <div
                style={{
                    width:"55px",
                    height:"55px",
                    borderRadius:"50%",
                    background:"#3b82f6",
                    color:"white",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    fontWeight:"700",
                    fontSize:"22px",
                    boxShadow:"0 0 20px rgba(59,130,246,.45)"
                }}
            >
                {customer.name.charAt(0).toUpperCase()}
            </div>

            <div>
                <h4>{customer.name}</h4>
                <p>{customer.city}</p>
            </div>

        </div>

        <span>
            ₹ {customer.totalSpending}
        </span>

    </div>

))}

        </div>
    );
}

export default RecentCustomers;