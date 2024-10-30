import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoNoText from "../assets/logoNoText.png";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../store/userSlice";
import { signUpCompany } from "../store/companySlice";

function getUserType(queryParams) {
  if (queryParams.get("type")) {
    if (queryParams.get("type") === "user") return true;
    else if (queryParams.get("type") === "company") return false;
  }
  return true;
}

const SignUp = () => {
  useAuthRedirect();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [isUser, setIsUser] = useState(getUserType(queryParams));
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingUser, errorUser } = useSelector((state) => state.user);
  const { loadingCompany, errorCompany } = useSelector(
    (state) => state.company
  );

  const handleSignUpEvent = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
      if (isUser) {
        let userCredentials = {
          username,
          password,
        };
        dispatch(signUpUser(userCredentials)).then((result) => {
          if (result.payload) {
            alert("User successfully created");
            setUsername("");
            setPassword("");
            navigate("/sign-in?type=user");
          }
        });
      } else {
        let companyCredentials = {
          companyName,
          password,
        };
        dispatch(signUpCompany(companyCredentials)).then((result) => {
          if (result.payload) {
            alert("Company successfully created");
            setCompanyName("");
            setPassword("");
            navigate("/sign-in?type=company");
          }
        });
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link
        to="/"
        className="flex items-center mb-6 text-2xl font-normal text-gray-900 dark:text-white"
      >
        <img className="h-8 mr-2" src={logoNoText} alt="logo"></img>
        LoremIpsum Slogan
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create your account
          </h1>
          <div className="flex w-full mt-4">
            <button
              onClick={() => {
                navigate('/sign-up?type=user')
                setIsUser(true)
              }}
              className={
                isUser
                  ? "bg-[#0063aa] text-white w-1/2 py-2 border-none rounded-l-lg"
                  : "bg-[#f0f9ff] w-1/2 py-2 border border-[#ccebff] rounded-l-lg"
              }
            >
              User
            </button>
            <button
              onClick={() => {
                navigate('/sign-up?type=company')
                setIsUser(false)
              }}
              className={
                !isUser
                  ? "bg-[#0063aa] text-white w-1/2 py-2 border-none rounded-r-lg"
                  : "bg-[#f0f9ff] w-1/2 py-2 border border-[#ccebff] rounded-r-lg"
              }
            >
              Company
            </button>
          </div>
          <form onSubmit={handleSignUpEvent} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor={ isUser ? "username" : "companyName"}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                { isUser ? "Username" : "Company Name"}
              </label>
              <input
                value={ isUser ? username : companyName}
                onChange={(e) => {
                   isUser
                    ? setUsername(e.target.value)
                    : setCompanyName(e.target.value);
                }}
                type="text"
                name={ isUser ? "username" : "companyName"}
                id={ isUser ? "username" : "companyName"}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={
                   isUser ? "YourUsername" : "YourCompanyName"
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
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
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {loadingUser || loadingCompany ? "Loading..." : "Sign Up"}
            </button>
            {errorUser && (
              <div className="text-red-600" role="alert">
                {errorUser}
              </div>
            )}
            {errorCompany && (
              <div className="text-red-600" role="alert">
                {errorCompany}
              </div>
            )}
            {!passwordMatch && (
              <div className="text-red-600" role="alert">
                Passwords don't match!
              </div>
            )}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
