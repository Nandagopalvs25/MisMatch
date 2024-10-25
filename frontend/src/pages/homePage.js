import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

import UploadModal1 from "../components/uploadModal1";
import MatchingModal from "../components/matchingModal";
import UploadModal2 from "../components/uploadModal2";

export default function HomePage() {
  const [isUploadModal1, setIsUploadModal1] = useState(false);
  const [isUploadModal2, setIsUploadModal2] = useState(false);
  const [isMatchModal, setIsMatchModal] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(
    localStorage.getItem("isUserCreated")
  );

  console.log("isUserCreated: ", isUserCreated);

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const [profileId, setProfileId] = useState();
  const [interestValue, setInterestValue] = useState("");
  const [personalityValue, setPersonalityValue] = useState("");
  const [summary, setSummary] = useState("");

  const [arrayInterestsValue, setArrayInterestsValue] = useState([]);
  const [arrayPersonalityValue, setArrayPersonalityValue] = useState([]);

  useEffect(() => {
    if (isUserCreated) {
      fetchUserProfile();
    }
  }, []);

  // useEffect(() => {
  //   fetchUserProfile();

  //   if (isUserCreated == true) {
  //     localStorage.setItem("isUserCreated", true);
  //   } else {
  //     localStorage.setItem("isUserCreated", false);
  //   }

  //   console.log("isUserCreated: ", isUserCreated);
  // }, [isUserCreated]);

  useEffect(() => {
    setArrayInterestsValue(interestValue?.split(","));
    setArrayPersonalityValue(personalityValue?.split(","));
  }, [interestValue, personalityValue]);

  const handleUploadSuccess = () => {
    setIsUserCreated(true);
    fetchUserProfile();
    localStorage.setItem("isUserCreated", true);
  };
  const fetchUserProfile = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const key = localStorage.getItem("key");

    if (!key) {
      console.log("Key not found...");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/createProfile/", {
        headers: {
          Authorization: `token ${key}`,
        },
      });

      console.log("response: ", response);

      if (response) {
        setProfileId(response?.data?.id);
        setSummary(response?.data?.summary);
        setInterestValue(response?.data?.interests);
        setPersonalityValue(response?.data?.personality);
        console.log("Profile fetched successfully...");
      } else {
        console.error("Invalid response data:", response.data);
        setErrorText("No Profile Data found");
      }
    } catch (error) {
      console.log("Error occurred: ", error);
      // alert("Invalid credentials. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-grad">
      <img
        className="absolute top-5 left-5 w-60 aspect-auto"
        src="/assets/logo2.png"
        alt="Mismatch"
      />

      <div className="sidebar absolute left-0 top-60 px-10 w-96 flex flex-col gap-10">
        <div>
          {isUserCreated ? (
            <button
              className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:scale-95"
              onClick={() => setIsUploadModal2(true)}
            >
              Update Profile
            </button>
          ) : (
            <button
              className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:scale-95"
              onClick={() => setIsUploadModal1(true)}
            >
              Create Profile
            </button>
          )}
        </div>

        <div>
          <button
            className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:scale-95"
            onClick={() => setIsMatchModal(true)}
          >
            Create Match
          </button>
        </div>
        {/* <button className="relative px-6 py-3 rounded-lg bg-pink-500 text-white font-semibold shadow-lg  transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:scale-95 focus:bg-pink-600">
          Find Love
        </button> */}
        {/* <button className="relative px-6 py-3 rounded-full bg-purple-500 text-white font-semibold shadow-md transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg focus:scale-95 focus:shadow-md">
          <span className="absolute inset-0 rounded-full opacity-0 bg-pink-500 blur-md transition-opacity duration-300 hover:opacity-30"></span>
          Join Now
        </button>
        <button className="relative px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:scale-95 overflow-hidden">
          <span className="absolute inset-0 bg-white opacity-0 rounded-full transition-opacity duration-300 transform scale-150 hover:scale-100 hover:opacity-20"></span>
          Match Me!
        </button>
        <button className="relative px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 ring-pink-300">
          <span className="absolute inset-0 bg-white opacity-0 rounded-lg transition-opacity duration-500 transform scale-125 focus:scale-90 focus:opacity-10"></span>
          Get Started
        </button>
        <button className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600 active:scale-90">
          <span className="absolute inset-0 animate-ping bg-red-300 opacity-30 rounded-lg"></span>
          Meet New People
        </button> */}
      </div>

      {isUploadModal1 && (
        <UploadModal1
          onClose={() => setIsUploadModal1(false)}
          onSuccess={() => handleUploadSuccess()}
        />
      )}
      {isUploadModal2 && (
        <UploadModal2
          onClose={() => setIsUploadModal2(false)}
          profile_id={profileId}
          interest_value={arrayInterestsValue}
          personality_value={arrayPersonalityValue}
          summaryy={summary}
        />
      )}
      {isMatchModal && <MatchingModal />}
    </div>
  );
}
