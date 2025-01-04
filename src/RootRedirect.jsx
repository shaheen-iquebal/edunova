import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = Cookies.get("userData");

    if (!userData) {
      // If no user data is found, redirect to login
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);
      // Redirect based on user type
      if (user.userType === "teacher") {
        navigate("/admin");
      } else if (user.userType === "student") {
        navigate("/student");
      } else {
        // Fallback to login if user type is invalid
        navigate("/login");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  // Return null since this is just a routing component
  return null;
}

export default RootRedirect;
