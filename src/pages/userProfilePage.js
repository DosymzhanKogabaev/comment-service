import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { comparePasswords, changeUserPassword } from "../services/userService.ts";

function getUser() {
  const user = localStorage.getItem("user");
  return JSON.parse(user);
}
const UserProfilePage = () => {
  const [user, setUser] = useState(getUser());
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("")

  const handleChangePasswordEvent = async (e) => {
    e.preventDefault();

    let changePassword = true
    if(!comparePasswords(currentPassword, user.password)) {
        setError("Wrong Password!")
        changePassword = false
    }
    if(newPassword !== confirmPassword) {
        setError("Passwords do not match!")
        changePassword = false
    }
    if(changePassword) {    
        try {
            const res = await changeUserPassword(user._id, newPassword)
            alert("Password changed successfully!")
            setError("")
            setNewPassword("")
            setCurrentPassword("")
            setConfirmPassword("")
        } catch (error) {
            if(newPassword.length < 8)
                setError("Password must contain at least 8 characters!")
            else 
                setError("Password is too weak!")
        }
    }
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="pt-20 px-8 bg-gray-100 w-full">
        <div className="max-w-3xl">
          <div className="text-3xl font-medium mb-4">My Profile</div>
          <div className="border bg-white px-4 py-4 rounded-xl">
            <div>Current Username</div>
            <div className="text-lg mb-4">{user.username}</div>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleChangePasswordEvent}
            >
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Current Password
                </label>
                <input
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between gap-4">
                <div className="w-6/12">
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="w-6/12">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="w-full text-right">
                <button
                  type="submit"
                  className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-20 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Save
                </button>
                {error && (
                    <div className="text-red-600 mt-4" role="alert">
                        {error}
                    </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfilePage;
