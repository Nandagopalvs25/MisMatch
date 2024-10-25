import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SuccessModal from "../components/successModal";

export default function SignupPage({ onLogin }) {
  const [userName, setUserName] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (isLoading) return;
    setIsLoading(true);

    if (createPassword != confirmPassword) {
      setError("Password does not match");
      setIsLoading(false);
      return;
    }

    const data = {
      username: userName,
      password1: createPassword,
      password2: confirmPassword,
    };

    console.log("data: ", data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register/",
        data
      );

      if (response.status === 204) {
        setIsSuccessModal(true);
        setTimeout(() => {
          navigate("/homePage");
        }, 2000);
      } else {
        setError("An unexpected response was received. Please try again.");
      }
    } catch (error) {
      console.log("Error occurred: ", error);
      console.log("Error occurred: ", error?.response?.data?.password1);

      if (
        error?.response?.data?.username?.[0] ==
        "A user with that username already exists."
      ) {
        setError("User already exists...");
      } else if (error?.response?.data?.password1) {
        setError("Password not strong...");
      } else {
        alert("Network error. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-full sm:h-screen overflow-hidden bg-grad">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h- w-60 aspect-auto"
            src="/assets/logo2.png"
            alt="Your Company"
          />         
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  border-2 rounded-3xl p-5">
        <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Account
          </h2>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 p-1.5 outline-none bg-white bg-opacity-50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="createPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Create Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="createPassword"
                    name="createPassword"
                    type="password"
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-1.5 outline-none bg-white bg-opacity-50"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="text"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-1.5 outline-none bg-white bg-opacity-50"
                  />
                </div>
                {error && (
                  <span className="text-red-500 font-semibold text-[12px]">
                    {error}
                  </span>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign up"}
                </button>
              </div>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("/login")}
            >
              Login Now
            </a>
          </p>
        </div>
      </div>

      {isSuccessModal && <SuccessModal message="Signup Successfull..." />}
    </div>
  );
}
