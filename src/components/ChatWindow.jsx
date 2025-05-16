// src/components/ChatWindow.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import socket from "../utils/socket";

const ChatWindow = ({ selectedUser, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Listen to incoming messages
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, { ...data, sender: "them" }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = () => {
    if (!input.trim() || !selectedUser) return;

    const msgData = {
      senderId: currentUserId,
      receiverId: selectedUser._id,
      message: input,
    };

    // Emit message to server
    socket.emit("sendMessage", msgData);

    // Add to local UI
    setMessages((prev) => [...prev, { ...msgData, sender: "me" }]);
    setInput("");
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: "1px solid #ccc" }}>
        {selectedUser ? selectedUser.name : "Select a user to chat"}
      </Typography>

      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <Paper
            key={index}
            sx={{
              p: 1.5,
              mb: 1,
              maxWidth: "60%",
              alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
              bgcolor: msg.sender === "me" ? "#00ED64" : "#e0e0e0",
              color: msg.sender === "me" ? "#fff" : "#000",
              borderRadius: 2,
            }}
          >
            {msg.message}
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: "flex", p: 2, borderTop: "1px solid #ccc" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton onClick={handleSend} color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWindow;
