import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("RECEIVER");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, email, role }),
        }
      );
      if (response.ok) {
        const user = await response.json();
        setUser(user);
        navigate("/food-items");
      } else {
        const error = await response.text();
        alert(`Registration failed: ${error}`);
      }
    } catch (error) {
      alert(`Network error: ${error}`);
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    setIsLoading(true); // Set loading to true for Google registration
    try {
      // Send the Google credential (ID token) directly as a plain string
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, // Change Content-Type to text/plain
        body: credentialResponse.credential, // Send the credential directly
      });
      if (response.ok) {
        const user = await response.json();
        setUser(user);
        navigate('/food-items');
      } else {
        alert('Google registration failed!');
      }
    } catch (error) {
      alert(`Network error: ${error}`);
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Google Registration Failed");
    alert("Google registration failed. Please try again.");
  };

  return (
    <div className="min-h-screen bg-deep-green flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-3xl shadow-2xl border border-yellow-200">
        <h2 className="text-4xl font-extrabold text-deep-green text-center mb-6">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-lg text-gray-600 mb-8">
          Join ShareHarvest to connect with communities and reduce food waste.
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="relative block w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow focus:outline-none focus:ring-yellow sm:text-lg"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow focus:outline-none focus:ring-yellow sm:text-lg"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-yellow focus:outline-none focus:ring-yellow sm:text-lg"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="relative block w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:z-10 focus:border-yellow focus:outline-none focus:ring-yellow sm:text-lg"
            >
              <option value="RECEIVER">Receiver</option>
              <option value="DONOR">Donor</option>
            </select>
          </div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-full border border-transparent bg-yellow py-3 px-4 text-lg font-bold text-deep-green hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 transition-all duration-300 shadow-lg"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-deep-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-700 text-md">
            Or continue with
          </p>
          <div className="mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              size="large"
              width="300"
              disabled={isLoading} // Disable Google button when loading
            />
          </div>
          <p className="text-gray-700 text-md mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-deep-green hover:text-yellow transition-colors duration-300">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
