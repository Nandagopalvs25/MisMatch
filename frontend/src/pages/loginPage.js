import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import SuccessModal from "../components/successModal";

export default function LoginPage({ onLogin }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (isLoading) return;
    setIsLoading(true);

    const data = {
      username: userName,
      password: password,
    };

    console.log("data: ", data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",
        data
      );

      if (response.status == 400) {
        console.log("404 error");

        setError("Invalid credentials. Try again");
        setIsLoading(false);
      }

      console.log("response: ", response);
      const key = response.data?.key; // Access the 'key' from response data

      if (key) {
        console.log("key: ", key);
        localStorage.setItem("key", key);
        setIsSuccessModal(true);
        setTimeout(() => {
          setIsSuccessModal(false);
          navigate("/");
        }, 2000);
        // onLogin(); // Call the onLogin function to update the authentication state
      } else if (
        response?.data?.non_field_errors?.[0] ==
        "Unable to log in with provided credentials."
      ) {
        console.log("non_field_errors");
        setError("Invalid credentials. Try again");
        setIsLoading(false);
        return;
      } else {
        console.error("Invalid response data:", response.data);
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log("Error occurred: ", error);
      console.log(error?.response?.data?.non_field_errors?.[0]);

      if (
        error?.response?.data?.non_field_errors?.[0] ==
        "Unable to log in with provided credentials."
      ) {
        setError("Invalid credentials. Try again");
        setIsLoading(false);
      } else {
        alert("Network error. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-grad">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            className="mx-auto h- w-60 aspect-auto"
            src="/assets/logo2.png"
            alt="Your Company"
          /> 
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 rounded-3xl p-5">
          <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
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
                    className=" w-full rounded-md border-0 p-1.5 text-gray-900 outline-none bg-white bg-opacity-50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={() => navigate("/signup")}
            >
              Signup Now
            </a>
          </p>
        </div>
      </div>
      {isSuccessModal && <SuccessModal message="Login Successfull..." />}
    </div>
  );
}
