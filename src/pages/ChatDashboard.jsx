// src/pages/ChatDashboard.jsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import socket from "../utils/socket";
import axios from "axios";

function ChatDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;

        console.log('data', data)
        setCurrentUserId(data._id);

        // Join socket room with current user ID
        socket.emit("join", data._id);
      } catch (error) {
        console.error("Failed to fetch user details:", error.response?.data || error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      <ChatSidebar currentUserId={currentUserId} onSelectUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} currentUserId={currentUserId} />
    </Box>
  );
}

export default ChatDashboard;
