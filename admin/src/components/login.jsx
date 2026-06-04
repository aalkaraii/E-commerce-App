import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isForgotPassword) {
        // Forgot Password Flow
        const response = await axios.post(
          backendUrl + "/api/user/admin/forgot-password",
          { email }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          // Optional: clear email or toggle back
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Login Flow
        const response = await axios.post(backendUrl + "/api/user/admin", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl border border-gray-100 max-w-md w-full overflow-hidden hover:shadow-3xl transition-all duration-300">
        {/* Decorative Top Accent */}
        <div className="h-2 bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400"></div>

        <div className="px-8 py-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            {isForgotPassword ? "Forgot Password" : "Admin Panel"}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {isForgotPassword
              ? "Enter your admin email to receive a password reset link."
              : "Please enter your credentials to access the dashboard."}
          </p>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:border-purple-400 focus:bg-white focus:outline-none transition-all duration-200"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            {!isForgotPassword && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setEmail("");
                    }}
                    className="text-xs text-purple-600 hover:text-purple-800 transition duration-150"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:border-purple-400 focus:bg-white focus:outline-none transition-all duration-200"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            )}

            <button
              className={`w-full py-3.5 px-4 mt-6 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading
                ? isForgotPassword
                  ? "Sending request..."
                  : "Logging in..."
                : isForgotPassword
                ? "Send Reset Link"
                : "Login"}
            </button>
          </form>

          {isForgotPassword && (
            <div className="text-center mt-5">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setEmail("");
                }}
                className="text-sm font-semibold text-gray-600 hover:text-black transition duration-150"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
