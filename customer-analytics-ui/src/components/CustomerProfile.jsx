import "../styles/customerProfile.css";

function CustomerProfile({ customer, onClose }) {
  if (!customer) return null;

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div
        className="profile-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="profile-header">
<div className="profile-avatar">

    {customer.image ? (

        <img
            src={customer.image}
            alt={customer.name}
            className="profile-avatar-image"
        />

    ) : (

        customer.name.charAt(0).toUpperCase()

    )}

</div>
    <h2>{customer.name}</h2>

    <p>{customer.email}</p>

    {customer.totalSpending >= 5000 && (
        <div className="premium-badge">
            👑 Premium Customer
        </div>
    )}
</div>

        <div className="profile-details">

          <div className="detail-row">
            <span>🏙 City</span>
            <strong>{customer.city}</strong>
          </div>
<div className="detail-row">
    <span>📊 Status</span>

    <strong
        className={
            customer.ordersCount >= 5
                ? "status-active"
                : "status-regular"
        }
    >
        {customer.ordersCount >= 5
            ? "🟢 Active"
            : "🟡 Regular"}
    </strong>
</div>
          <div className="detail-row">
            <span>💰 Total Spending</span>
            <strong>₹ {customer.totalSpending}</strong>
          </div>

          <div className="detail-row">
            <span>📦 Orders</span>
            <strong>{customer.ordersCount}</strong>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;