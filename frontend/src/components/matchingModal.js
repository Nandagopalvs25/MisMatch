import React, { useState, useEffect } from "react";
import axios from "axios";

const MatchingModal = ({ onMatchComplete }) => {
  const [isMatching, setIsMatching] = useState(true);
  const [matchedUser, setMatchedUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [swipeInterval, setSwipeInterval] = useState(null);
  const [errorText, setErrorText] = useState("");

  const placeholderProfiles = [
    { name: "Anjali", age: 25 },
    { name: "Anand", age: 29 },
    { name: "Anakha", age: 28 },
    { name: "Rishit", age: 24 },
    { name: "Adil", age: 28 },
    { name: "Sarojini", age: 28 },
    { name: "Anakha", age: 28 },
    { name: "Maya", age: 28 },
  ];

  useEffect(() => {
    const startMatching = () => {
      const interval = setInterval(() => {
        const randomProfile =
          placeholderProfiles[
            Math.floor(Math.random() * placeholderProfiles.length)
          ];
        setTempUser(randomProfile);
      }, 100);

      setSwipeInterval(interval);

      setTimeout(async () => {
        clearInterval(interval);
        await fetchMatchedUser();
        setIsMatching(false);
      }, 5000);
    };

    const fetchMatchedUser = async () => {
      const key = localStorage.getItem("key");

      if (!key) {
        console.log("Key not found...");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/findMatch/", {
          headers: {
            Authorization: `token ${key}`,
          },
        });
        console.log("findMatch Response: ", response);

        setMatchedUser(response.data);
      } catch (error) {
        console.error("Failed to fetch matched user", error);
      }
    };

    const closeAfterMatch = () => {
      setTimeout(() => {
        onMatchComplete(matchedUser); // Pass user details back to the parent component
      }, 3000); // Display matched user for 3 seconds
    };

    if (isMatching) {
      startMatching();
    } else if (matchedUser) {
      closeAfterMatch();
    } else {
      setErrorText("Failed to Match perfect pair. Try again.");
    }

    return () => {
      if (swipeInterval) clearInterval(swipeInterval);
    };
  }, [isMatching, matchedUser, onMatchComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 max-w-md p-8 bg-[#f6e67ee2] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Finding Your Match...
        </h2>
        <div className="relative w-full h-48 flex justify-center items-center mt-4">
          {isMatching && tempUser && (
            <div className="w-full px-6 py-4 bg-[#e94343c8] text-center rounded-lg shadow-lg transition-transform duration-200 animate-swipe">
              <h3 className="text-lg font-bold text-gray-800">
                {tempUser.name}
              </h3>
              <p className="text-gray-600">Age: {tempUser.age}</p>
            </div>
          )}

          {matchedUser && (
            <div className="w-full px-6 py-4 bg-[#e14848d0] text-center rounded-lg shadow-lg transition-transform transform scale-110 animate-pop">
              <h3 className="text-lg font-bold text-gray-800">
                {matchedUser?.name}
              </h3>
              <p className="text-gray-600">Age: {matchedUser?.age}</p>
              {/* <p className="text-gray-600 mt-2">Bio: {matchedUser.bio}</p> */}
            </div>
          )}
          {/* {errorText && <span className="text-red-500">{errorText}</span>} */}
        </div>
      </div>
    </div>
  );
};

export default MatchingModal;
