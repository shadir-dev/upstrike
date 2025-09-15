// src/components/protected route.js
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost/cliantelle_projects/backend/checkauth.php", {
          method: "GET",
          credentials: "include", // important for PHP sessions
        });

        const data = await res.json();
        setIsValid(data.authenticated === true); // ✅ match backend response
      } catch (error) {
        setIsValid(false);
      }
    };

    checkAuth();
  }, []);

  if (isValid === null) {
    return <p>Loading...</p>; // loader while checking session
  }

  return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
