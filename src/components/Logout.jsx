import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the user data cookie
    Cookies.remove("userData");

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; // No UI required
}

export default Logout;
