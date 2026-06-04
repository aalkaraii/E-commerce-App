import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = ({ token }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }
    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/user/admin/change-password`,
        { oldPassword, newPassword },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
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

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="h-2 bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400"></div>
        
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Security Settings</h2>
          <p className="text-gray-500 text-sm mb-6">Update your administrator account password</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:border-purple-400 focus:bg-white focus:outline-none transition-all duration-200"
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
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:border-purple-400 focus:bg-white focus:outline-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 mt-4 font-bold text-white rounded-xl bg-black hover:bg-gray-800 transition-all duration-250 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Updating password..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
