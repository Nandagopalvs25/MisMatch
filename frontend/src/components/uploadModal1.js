import axios from "axios";
import React, { useState, Component, useEffect } from "react";
import { Chips } from "primereact/chips";
import classNames from "classnames";

import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const UploadModal = ({ id, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [summary, setSummary] = useState("");
  const [interestValue, setInterestValue] = useState([]);
  const [personalityValue, setPersonalityValue] = useState([]);

  // useEffect(() => {
  //   console.log("chips:", value);
  // }, [value]);

  // const getFormattedDate = () => {
  //   const date = new Date();

  //   const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad it to 2 digits
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based index) and pad to 2 digits
  //   const year = String(date.getFullYear()).slice(2); // Get the last two digits of the year

  //   return `${day}/${month}/${year}`;
  // };

  const handleAddPatient = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log("id: ", id);

    const key = localStorage.getItem("key");

    if (!key) {
      console.log("Key not found...");
      setIsLoading(false);
      return;
    }

    const stringInterest = interestValue.join(", ");
    const stringPersonality = personalityValue.join(", ");

    const data = {
      summary: summary,
      interests: stringInterest,
      personality: stringPersonality,
    };

    console.log("data: ", data);

    try {
      const response = await axios.patch(
        "http://127.0.0.1:8000/updateProfile/5/",
        data,
        {
          headers: {
            Authorization: `token ${key}`,
          },
        }
      );

      console.log("response: ", response);

      if (response) {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          onClose();
        }, 2000);
        // onLogin(); // Call the onLogin function to update the authentication state
      } else {
        console.error("Invalid response data:", response.data);
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log("Error occurred: ", error);
      alert("Invalid credentials. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="flex justify-center w-full fixed top-0 left-0 px-3 backdrop-blur-md z-[100] h-screen"
      data-aos="fade-in"
    >
      {!successModal ? (
        <div className="flex flex-col gap-10 my-20 bg-gradient-to-r from-[#e9de7d5c] to-[#e91c1c8f] p-8 sm:p-10 rounded-3xl max-w-xl z-50">
          <div className="flex flex-col gap-10">
            <div className="flex justify-end">
              <IoClose onClick={onClose} size={40} className="cursor-pointer" />
            </div>
            <div className="flex flex-col gap-3 w-96 font-mono">
              <div className="flex flex-col">
                <label>Interests</label>
                {/* <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-1 rounded-lg bg-slate-100 outline-none"
                /> */}
                <div className="card p-fluid">
                  <Chips
                    value={interestValue}
                    onChange={(e) => setInterestValue(e.value)}
                    separator=","
                    className="flex gap-2 space-x-2 w-full bg-white bg-opacity-30 rounded-lg p-1"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>Personality</label>
                {/* <input
                  type="text"
                  // placeholder="enter the url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="p-1 rounded-lg bg-white bg-opacity-30 outline-none"
                /> */}
                <Chips
                  value={personalityValue}
                  onChange={(e) => setPersonalityValue(e.value)}
                  separator=","
                  className="flex gap-2 space-x-2 w-full bg-white bg-opacity-30 rounded-lg p-1"
                />
              </div>
              <div className="flex flex-col">
                <label>Summary</label>
                <input
                  type="text"
                  // placeholder="enter the url"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="p-1 rounded-lg bg-white bg-opacity-30 outline-none"
                />
              </div>
              {/* <div className="flex flex-col">
                <label>Record Type</label>
                <select
                  placeholder="enter sex orientation of patient"
                  value={recordType}
                  onChange={(e) => setRecordType(e.target.value)}
                  className="p-1 rounded-lg bg-slate-100 outline-none cursor-pointer"
                >
                  <option selected disabled value="">
                    select report type
                  </option>
                  <option value="diagnoses">Medical Record</option>
                  <option value="medications">Transcripts</option>
                  <option value="labresult">Photos</option>
                </select>
              </div> */}
              {/* <div className="flex flex-col">
                <label>Doctor</label>
                <input
                  placeholder="enter doctor assigned to patient"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="p-1 rounded-lg bg-slate-100 outline-none"
                />
              </div> */}
            </div>

            <div className="flex justify-center">
              <button
                className={`p-2 px-14 sm:px-20 rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white cursor-pointer ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
                onClick={handleAddPatient}
                // disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Loading..." : "Add"}
              </button>
              {/* <button className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:scale-95">
                {isLoading ? "Loading..." : "Add"}
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-screen w-screen items-center">
          <FaCheckCircle size={100} data-aos="zoom-in" color="green" />
        </div>
      )}
    </div>
  );
};
export default UploadModal;

const Tailwind = {
  chips: {
    root: ({ props }) => ({
      className: classNames("flex", {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      }),
    }),
    container: {
      className: classNames(
        "m-0 py-1.5 px-3 list-none cursor-text overflow-hidden flex items-center flex-wrap",
        "w-full",
        "font-sans text-base text-gray-600 dark:text-white/70 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg",
        "hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]"
      ),
    },
    inputToken: {
      className: classNames("py-1.5 px-0", "flex flex-1 inline-flex"),
    },
    input: {
      className: classNames(
        "font-sans text-base text-gray-700 dark:text-white/80 p-0 m-0",
        "border-0 outline-none bg-transparent shadow-none rounded-none w-full"
      ),
    },
    token: {
      className: classNames(
        "py-1 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full",
        "cursor-default inline-flex items-center"
      ),
    },
    removeTokenIcon: "ml-2",
  },
};
