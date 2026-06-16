import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
 const token = localStorage.getItem("token");

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  // Login check
  if (!token) {
    return <Navigate to="/Login" />;
  }

  // Admin role check
  if (userInfo?.role !== "admin") {
    return <Navigate to="/Login" />;
  }

  return children;
};
export default ProtectedRoute;
