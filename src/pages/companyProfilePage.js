import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import {
  comparePasswords,
  changeCompanyPassword,
} from "../services/companyService.ts";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import noimage from "../assets/no-image.jpg";
import StarRating from "../components/starRating.js";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

function getCompany() {
  const company = localStorage.getItem("company");
  return JSON.parse(company);
}

const CompanyProfilePage = () => {
  const navigate = useNavigate();

  const [company, setCompany] = useState(getCompany());
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState(company.websiteUrl || "");
  const [employeesNumber, setEmployeesNumber] = useState(
    company.employeesNumber || ""
  );
  const [city, setCity] = useState(company.city || "");
  const [yearFounded, setYearFounded] = useState(company.yearFounded || "");
  const [description, setDescription] = useState(company.description || "");
  const [imgUrl, setImgUrl] = useState(company.imgUrl || "");
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState(company.imgUrl || "");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "info";

  const handleChangePasswordEvent = async (e) => {
    e.preventDefault();

    let changePassword = true;
    if (!comparePasswords(currentPassword, company.password)) {
      setError("Wrong Password!");
      changePassword = false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      changePassword = false;
    }
    if (changePassword) {
      try {
        const res = await changeCompanyPassword(company._id, newPassword);
        alert("Password changed successfully!");
        setError("");
        setNewPassword("");
        setCurrentPassword("");
        setConfirmPassword("");
      } catch (error) {
        if (newPassword.length < 8)
          setError("Password must contain at least 8 characters!");
        else setError("Password is too weak!");
      }
    }
  };

  const removeEmptyFields = (obj) => {
    const result = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      if (value !== undefined && value !== '') {
        result[key] = value;
      }
    });
    return result;
  };
  

  const handleSaveInfo = async () => {
    let isSuccessful = false
    try {
      setIsLoading(true);
      const obj = removeEmptyFields({
        websiteUrl: websiteUrl,
        imgUrl: imgUrl,
        employeesNumber: employeesNumber,
        city: city,
        yearFounded: yearFounded,
        description: description
      })
      const res = await axios.patch(
        `https://comment-service-backend.onrender.com/companies/${company._id}`,
        obj
      );
      localStorage.setItem('company', JSON.stringify(res.data))
      isSuccessful = true;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      if(isSuccessful) {
        alert("Company info was changed succesfully!");
        setEditMode(false);
        navigate(0)
      }
    }
  };

  useEffect(() => {
    if (company.imgUrl) {
      validateImageUrl(company.imgUrl);
    }
  }, [company.imgUrl]);

  const handleImageChange = (e) => {
    const newUrl = e.target.value;
    setImageUrlInput(newUrl);
    validateImageUrl(newUrl);
  };

  const validateImageUrl = (url) => {
    if (!url) {
      setIsValidUrl(false);
      return;
    }

    const img = new Image();
    img.src = url;
    img.onload = () => setIsValidUrl(true);
    img.onerror = () => setIsValidUrl(false);
  };

  const handleSaveImage = async () => {
    setImgUrl(imageUrlInput);
    setShowImageDialog(false);
  };

  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="pt-20 px-8 bg-gray-100 w-full">
        <div className="max-w-3xl">
          <div className="text-3xl font-medium">My Profile</div>
          <div className="flex mt-4">
            <Link
              to="/company-profile-page?tab=info"
              className={
                tab === "info"
                  ? "px-4 py-3 border-b border-[#3460a4]"
                  : "px-4 py-3 border-b border-gray-300"
              }
            >
              Info
            </Link>
            <Link
              to="/company-profile-page?tab=password"
              className={
                tab === "password"
                  ? "px-4 py-3 border-b border-[#3460a4]"
                  : "px-4 py-3 border-b border-gray-300"
              }
            >
              Password
            </Link>
          </div>
          {tab === "info" && (
            <div className="border bg-white px-8 py-6 rounded-xl mt-4">
              <div className="flex gap-4">
                <div className="relative w-[80px] h-[80px] flex">
                  <img
                    className={
                      imgUrl
                        ? "rounded-xl my-auto w-full h-full object-cover"
                        : "rounded-xl border w-full h-full object-cover"
                    }
                    src={imgUrl ? imgUrl : noimage}
                    alt="Company"
                  />
                  {editMode && (
                    <button
                      className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-md"
                      onClick={() => setShowImageDialog(true)}
                    >
                      <FaEdit className="text-gray-600" />
                    </button>
                  )}
                </div>
                <div>
                  <div className="text-2xl font-semibold">
                    {company.companyName}
                  </div>
                  <div className="flex mt-2">
                    <div>{parseFloat(company.rating).toFixed(1)}</div>
                    <StarRating rating={company.rating}></StarRating>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 mt-4">
                <div>
                  <div className="text-[#bdbdbd]">Company website</div>
                  {editMode ? (
                    <input
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      type="text"
                      name="websiteUrl"
                      placeholder="https://google.com/"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    />
                  ) : (
                    <a
                      href={company.websiteUrl || ""}
                      className="text-[#3460a4]"
                    >
                      {company.websiteUrl || "Edit to add"}
                    </a>
                  )}
                </div>
                <div>
                  <div className="text-[#bdbdbd]">Number of employees</div>
                  {editMode ? (
                    <input
                      value={employeesNumber}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEmployeesNumber(value === '' ? '' : Number(value));
                      }}
                      type="number"
                      name="employeesNumber"
                      placeholder="12345"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    />
                  ) : (
                    <div>{company.employeesNumber || "Edit to add"}</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 mt-4">
                <div>
                  <div className="text-[#bdbdbd]">City (head office)</div>
                  {editMode ? (
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      name="city"
                      placeholder="Moscow"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    />
                  ) : (
                    <div>{company.city || "Edit to add"}</div>
                  )}
                </div>
                <div>
                  <div className="text-[#bdbdbd]">Year founded</div>
                  {editMode ? (
                    <input
                      value={yearFounded}
                      onChange={(e) => {
                        const value = e.target.value;
                        setYearFounded(value === '' ? '' : Number(value));
                      }}
                      type="number"
                      name="yearFounded"
                      placeholder="2024"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    />
                  ) : (
                    <div>{company.yearFounded || "Edit to add"}</div>
                  )}
                </div>
              </div>
              <div className="border-t mt-4 pt-2">
                <div className="text-[#bdbdbd]">Description</div>
                {editMode ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Company's description"
                    className="resize-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                  />
                ) : (
                  <div>{company.description || "Edit to add"}</div>
                )}
              </div>
              <div className="w-full mt-6 flex gap-x-6 justify-end">
                {editMode && (
                  <button
                    className="bg-gray-300 text-black py-2.5 px-20 rounded-lg"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={editMode ? handleSaveInfo : () => setEditMode(true)}
                  className="text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-20 py-2.5"
                >
                  {!editMode ? "Edit" : isLoading ? "Loading..." : "Save"}
                </button>
              </div>
              {showImageDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                    <h3 className="text-lg font-semibold mb-4">
                      Edit Image URL
                    </h3>
                    <input
                      type="text"
                      value={imageUrlInput}
                      onChange={handleImageChange}
                      placeholder="Enter Image URL"
                      className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    {!isValidUrl && imageUrlInput && (
                      <div className="text-red-600">Invalid Image Url</div>
                    )}
                    {!imageUrlInput && (
                      <div className="text-red-600">Empty Image Url</div>
                    )}
                    <img
                      src={isValidUrl ? imageUrlInput : noimage}
                      alt="Preview"
                      className="mx-auto w-32 object-cover my-4"
                    />
                    <div className="flex justify-end gap-4">
                      <button
                        className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                        onClick={() => setShowImageDialog(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={handleSaveImage}
                        disabled={!isValidUrl}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {tab === "password" && (
            <div className="border bg-white px-8 py-6 rounded-xl mt-4">
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
          )}
        </div>
      </div>
    </div>
  );
};
export default CompanyProfilePage;
