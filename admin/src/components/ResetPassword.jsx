import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !email) {
      return toast.error("Invalid reset link. Missing token or email.");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/user/admin/reset-password`,
        { email, token, newPassword }
      );

      if (response.data.success) {
        toast.success("Password reset successful!");
        setDone(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-200">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Invalid Link</h2>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or incomplete. Please request a new one.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
        <div className="h-2 bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400"></div>

        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Reset Password</h2>
          <p className="text-gray-500 text-sm mb-6">Set a new password for your admin account</p>

          {done ? (
            <div className="text-center py-4">
              <div className="text-green-500 font-semibold mb-6">
                Your password has been successfully reset.
              </div>
              <button
                onClick={() => navigate("/")}
                className="w-full py-3.5 px-4 font-bold text-white rounded-xl bg-black hover:bg-gray-800 transition duration-200"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:border-purple-400 focus:bg-white focus:outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:border-purple-400 focus:bg-white focus:outline-none transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 font-bold text-white rounded-xl bg-black hover:bg-gray-800 transition duration-200 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
