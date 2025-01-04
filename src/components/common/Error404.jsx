import { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import Cookies from "js-cookie";

function Error404() {
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // Retrieve and parse the userData cookie
    const userData = Cookies.get("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setUserType(user.userType);
    }
  }, []);

  // Determine the redirect link based on the user type
  const getRedirectLink = () => {
    if (userType === "student") return "/student";
    if (userType === "teacher") return "/admin";
    return "#";
  };

  return (
    <>
      {/* component */}
      <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
          <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-rose-400">
            404
          </p>
          <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
            Page Not Found
          </p>
          <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
            Sorry, the page you are looking for could not be found.
          </p>
          {userType && (
            <a
              href={getRedirectLink()}
              className="shadow flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
              title="Return Home"
            >
              <IoIosHome className="inline" />
              <span>Return Home</span>
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default Error404;
