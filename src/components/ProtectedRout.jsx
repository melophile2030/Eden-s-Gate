import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("authToken");
  const tokenExpiry = sessionStorage.getItem("tokenExpiry");

  //  Check if token exists and is not expired
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

  //  Extend session while user is active
  useEffect(() => {
    if (!token) return; // Run only for logged-in users

    const extendSession = () => {
      const newExpiry = Date.now() + 1 * 60 * 1000; 
      sessionStorage.setItem("tokenExpiry", newExpiry.toString());
      console.log("🔄 Session extended to : ", new Date(newExpiry).toLocaleTimeString());
    };

    // Listen for activity events
    window.addEventListener("mousemove", extendSession);
    window.addEventListener("keydown", extendSession);
    window.addEventListener("click", extendSession);

    // Cleanup when unmounted (logout or page change)
    return () => {
      window.removeEventListener("mousemove", extendSession);
      window.removeEventListener("keydown", extendSession);
      window.removeEventListener("click", extendSession);
    };
  }, [token]); // Re-run when token changes (e.g., on login/logout)

  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
