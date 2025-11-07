import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("authToken");
  const tokenExpiry = sessionStorage.getItem("tokenExpiry");

  // Check if token exists and is not expired
  const isTokenValid = () => {
    if (!token || !tokenExpiry) return false;

    const now = new Date().getTime();
    const expiryTime = parseInt(tokenExpiry, 10);

    if (now >= expiryTime) {
      // Clear expired token
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("tokenExpiry");
      return false;
    }

    return true;
  };

  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
