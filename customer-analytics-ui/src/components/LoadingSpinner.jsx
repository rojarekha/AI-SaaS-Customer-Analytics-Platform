import "../styles/loading.css";

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <h2>Loading Customers...</h2>
    </div>
  );
}

export default LoadingSpinner;