import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatWindow = ({ name, profileId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("chatMessages")) || []
  );
  const [inputMessage, setInputMessage] = useState("");

  const key = localStorage.getItem("key");

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages?.length > 0) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    console.log("Messages: ", messages);
  }, [messages]);

  const sendMessageToApi = async (date, message) => {
    if (!key) {
      console.log("Key not found...");
      return;
    }
    const data = {
      prompt: inputMessage,
      id: profileId,
    };
    try {
      const response = await axios.post("http://127.0.0.1:8000/aichat/", data, {
        headers: {
          Authorization: `token ${key}`,
        },
      });

      console.log("response: ", response);

      if (response?.data) {
        return response?.data;
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.log("Error occurred: ", error);
      alert("Invalid credentials. Try again later.");
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      type: "user",
      content: inputMessage,
      date: selectedDate,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");

    const responseMessage = await sendMessageToApi(selectedDate, inputMessage);

    if (responseMessage) {
      const apiMessage = {
        type: "bot",
        content: responseMessage,
        date: selectedDate,
      };
      setMessages((prevMessages) => [...prevMessages, apiMessage]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleTranscript = (transcript) => {
    console.log("transcript: ", transcript);
    setInputMessage(transcript);
  };

  return (
    <div className="fixed bottom-10 right-10 rounded-lg shadow-lg p-6 w-96 bg-gradient-to-tr from-yellow-400 to-pink-500">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Chat with {name}
      </h2>

      <div className="chat-window bg-gray-200 p-4 rounded-lg overflow-y-auto h-80 mb-4">
        {messages?.length > 0 ? (
          messages?.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 ${
                msg?.type === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  msg?.type === "user"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <p>{msg?.content}</p>
                {/* <span className="text-xs text-gray-600 block">
                  {msg.date.toDateString()}
                </span> */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet...</p>
        )}
      </div>

      <div className="flex max-w-full">
        <div className="relative w-full">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 p-2 border rounded-md w-full outline-none"
            placeholder="Type your message..."
          ></input>
        </div>
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-gradient-to-tr from-[#d54949e9] to-[#d7eb45dd] text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
