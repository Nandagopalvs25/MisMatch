import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchingModal = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [swipeInterval, setSwipeInterval] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const placeholderProfiles = [
    { name: "User A", age: 25 },
    { name: "User B", age: 29 },
    { name: "User C", age: 24 },
    { name: "User D", age: 28 },
  ];

  const fetchMatchedUser = async () => {
    try {
      const response = await axios.get('/api/match');
      setMatchedUser(response.data);
    } catch (error) {
      console.error("Failed to fetch matched user", error);
    }
  };

  const startMatching = () => {
    setIsMatching(true);
    setMatchedUser(null);
    setTempUser(null);

    const interval = setInterval(() => {
      const randomProfile = placeholderProfiles[Math.floor(Math.random() * placeholderProfiles.length)];
      setTempUser(randomProfile);
    }, 100);

    setSwipeInterval(interval);

    setTimeout(async () => {
      clearInterval(interval);
      await fetchMatchedUser();
      setIsMatching(false);
    }, 3000);
  };

//   const openModal = () => {
//     setIsModalOpen(true);
//     startMatching();
//   };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsMatching(false);
    setMatchedUser(null);
    setTempUser(null);
  };

  useEffect(()=>{
    setIsModalOpen(true);
    startMatching();
  })
  useEffect(() => {
    return () => {
      if (swipeInterval) clearInterval(swipeInterval);
    };
  }, [swipeInterval]);

  return (
    <div className="absolute w-screen h-screen z-50 top-0 left-0 flex flex-col items-center mt-8">
      {/* <button
        onClick={openModal}
        className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-full transition duration-300 transform hover:scale-105 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300"
      >
        Create Match
      </button> */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-11/12 max-w-md p-8 bg-white rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold text-center mb-4">Finding Your Match...</h2>
            <div className="relative w-full h-48 flex justify-center items-center mt-4">
              {isMatching && tempUser && (
                <div className="w-full px-6 py-4 bg-white text-center rounded-lg shadow-lg transition-transform duration-200 animate-swipe">
                  <h3 className="text-lg font-bold text-gray-800">{tempUser.name}</h3>
                  <p className="text-gray-600">Age: {tempUser.age}</p>
                </div>
              )}

              {matchedUser && (
                <div className="w-full px-6 py-4 bg-pink-100 text-center rounded-lg shadow-lg transition-transform transform scale-110 animate-pop">
                  <h3 className="text-lg font-bold text-gray-800">{matchedUser.name}</h3>
                  <p className="text-gray-600">Age: {matchedUser.age}</p>
                  <p className="text-gray-600 mt-2">Bio: {matchedUser.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingModal;
