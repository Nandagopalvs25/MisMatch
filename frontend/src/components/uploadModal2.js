import axios from "axios";
import React, { useState, Component, useEffect } from "react";
import { Chips } from "primereact/chips";
import classNames from "classnames";
import '../App.css'
import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const UploadModal = ({
  profile_id,
  interest_value,
  personality_value,
  summaryy,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorText, setErrorText] = useState("");

  // const [profileId, setProfileId] = useState(profile_id || null);
  const [summary, setSummary] = useState(summaryy || "");
  const [interestValue, setInterestValue] = useState(interest_value || []);
  const [personalityValue, setPersonalityValue] = useState(
    personality_value || []
  );

  const updateUserProfile = async () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log("ProfileId: ", profile_id);

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

    console.log("update profile data: ", data);

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/updateProfile/${profile_id}/`,
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
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="p-1 rounded-lg bg-white bg-opacity-30 outline-none w-full max-w-md input-overflow object-contain"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className={`p-2 px-14 sm:px-20 rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white cursor-pointer ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
                onClick={updateUserProfile}
                // disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Loading..." : "Update"}
              </button>
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
