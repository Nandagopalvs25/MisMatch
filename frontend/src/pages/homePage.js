import React, { useState } from "react";
import "../App.css";

import UploadModal from "../components/uploadModal";
import MatchingModal from "../components/matchingModal";

export default function HomePage() {
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [isMatchModal, setIsMatchModal] = useState(false);
  return (
    <div className="w-screen h-screen bg-grad">
      <img
        className="absolute top-5 left-5 w-60 aspect-auto"
        src="/assets/logo2.png"
        alt="Mismatch"
      />

      <div className="sidebar absolute left-0 top-60 px-10 w-96 flex flex-col gap-10">
        {/* <div>
          <span>Create Match</span>
        </div>
        <div>
          <span>Profile Details</span>
        </div> */}
        <div>
          <button
            className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:scale-95"
            onClick={() => setIsMatchModal(true)}
          >
            Create Match
          </button>
        </div>
        <div>
          <button
            className="relative px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-lg focus:scale-95"
            onClick={() => setIsUploadModal(true)}
          >
            Add details
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

      {isUploadModal && <UploadModal onClose={() => setIsUploadModal(false)} />}
      {isMatchModal && <MatchingModal />}
    </div>
  );
}
