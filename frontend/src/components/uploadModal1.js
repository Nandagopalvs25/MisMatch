import axios from "axios";
import React, { useState, Component, useEffect } from "react";
import { Chips } from "primereact/chips";
import classNames from "classnames";

import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const UploadModal = ({ onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [summary, setSummary] = useState("");
  const [interestValue, setInterestValue] = useState([]);
  const [personalityValue, setPersonalityValue] = useState([]);
  const [age, setAge] = useState();
  const [expectations, setExpectations] = useState([]);
  const [gender, setGender] = useState([]);

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

  const handleAddProfile = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const key = localStorage.getItem("key");

    if (!key) {
      console.log("Key not found...");
      setIsLoading(false);
      return;
    }

    const stringInterest = interestValue.join(", ");
    const stringPersonality = personalityValue.join(", ");
    const stringExpectstions = expectations.join(", ");

    const data = {
      summary: summary,
      interests: stringInterest,
      personality: stringPersonality,
      age: age,
      gender: gender,
      preferences: stringExpectstions,
    };

    console.log("create profile data: ", data);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/createProfile/",
        data,
        {
          headers: {
            Authorization: `token ${key}`,
          },
        }
      );

      console.log("response: ", response);
      console.log("response status: ", response?.status);

      if (response?.status == 200) {
        setSuccessModal(true);
        setTimeout(() => {
          setSuccessModal(false);
          onClose();
        }, 2000);
        onSuccess();
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
              <div className="flex gap-1 items-center">
                <label>Age: </label>
                <input
                  type="text"
                  // placeholder="enter the url"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="p-1 rounded-lg bg-white bg-opacity-30 outline-none"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label>Gender: </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="form-radio text-pink-500"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="form-radio text-pink-500"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <label>Expectations in partner</label>
                {/* <textarea
                  type="text"
                  value={expectations}
                  onChange={(e) => setExpectations(e.target.value)}
                  className="p-1 rounded-lg bg-white bg-opacity-30 outline-none w-full max-w-md input-overflow object-contain"
                /> */}
                <div className="card p-fluid">
                  <Chips
                    value={expectations}
                    onChange={(e) => setExpectations(e.value)}
                    separator=","
                    className="flex gap-2 space-x-2 w-full bg-white bg-opacity-30 rounded-lg p-1"
                  />
                </div>
              </div>
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
                onClick={handleAddProfile}
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
