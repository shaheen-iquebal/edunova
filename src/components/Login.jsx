// Old Login
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import userDetails from "./../data/userDetails.json"; // Assuming the JSON file is in the same directory
import { DropdownMenuDemo } from "@/DropdownMenuDemo";

function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user exists based on username or email
    const user = userDetails.find(
      (user) =>
        (user.username === formData.emailOrUsername ||
          user.email === formData.emailOrUsername) &&
        user.password === formData.password
    );

    if (user) {
      // Save user data to cookies
      Cookies.set("userData", JSON.stringify(user), { expires: 7 }); // Expires in 7 days
      setError("");
      // alert("Login successful!");
      console.log("User data saved in cookie:", user);
      if (user.userType === "teacher") navigate("/admin");
      else navigate("/student"); // Redirect to home page
    } else {
      setError("Invalid username/email or password.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold pr-10">
                  Sign In to
                  Continue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  onSubmit={handleSubmit}
                  className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                >
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="emailOrUsername"
                      name="emailOrUsername"
                      type="text"
                      value={formData.emailOrUsername}
                      onChange={handleInputChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                      placeholder="Username or Email"
                    />
                    <label
                      htmlFor="emailOrUsername"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Username/Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-4 py-1 hover:bg-blue-600"
                    >
                      Login
                    </button>
                    {/* <DropdownMenuDemo /> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
