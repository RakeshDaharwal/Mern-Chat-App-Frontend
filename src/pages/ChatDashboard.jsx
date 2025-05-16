import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import socket from "../utils/socket";
import axios from "axios";

function ChatDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/user/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = res.data;
        setCurrentUserId(data._id);
        setCurrentUserName(data.name);
      } catch (error) {
        console.error(
          "Failed to fetch user details:",
          error.response?.data || error.message
        );
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!selectedUser || !currentUserId) return;

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/chat/${currentUserId}/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(res.data);
        const roomId = [currentUserId, selectedUser._id].sort().join("_");
        socket.emit("joinRoom", roomId);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [selectedUser, currentUserId]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (
        (msg.sender === currentUserId &&
          msg.receiver === selectedUser?._id) ||
        (msg.sender === selectedUser?._id &&
          msg.receiver === currentUserId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedUser, currentUserId]);

  return (
<Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Mobile Hamburger Icon */}
      {isMobile && (
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar (Desktop) */}
      {!isMobile && (
        <ChatSidebar
          currentUserName={currentUserName}
          currentUserId={currentUserId}
          onSelectUser={setSelectedUser}
        />
      )}

      {/* Drawer (Mobile) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <ChatSidebar
            currentUserName={currentUserName}
            currentUserId={currentUserId}
            onSelectUser={(user) => {
              setSelectedUser(user);
              setDrawerOpen(false); // Close drawer after selecting user
            }}
          />
        </Box>
      </Drawer>

      {/* Main Chat Window */}
      <Box  sx={{ display: "flex", height: "100vh", width:'100%', bgcolor: "#f5f5f5" }}>
        {selectedUser ? (
          <ChatWindow
            currentUserId={currentUserId}
            messages={messages}
            selectedUser={selectedUser}
          />
        ) : isMobile ? (
          <Box
            sx={{
              height: "100%",
              width:'100%',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary"  sx={{
              
              textAlign: "center",
              
            }}>
              No user selected
            </Typography>
          </Box>
        ) : (
          <>
          <Box
            sx={{
              height: "100%",
              width:'100%',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary"  sx={{
              
              textAlign: "center",
              
            }}>
              No user selected
            </Typography>
          </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ChatDashboard;

