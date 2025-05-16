
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import socket from "../utils/socket";



const ChatWindow = ({ selectedUser, currentUserId, messages }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);


  console.log('mess', messages)

  const handleSend = () => {
    if (!input.trim() || !selectedUser || !currentUserId) return;

    const messagePayload = {
      sender: currentUserId,
      receiver: selectedUser._id,
      text: input,
    };

    console.log('messagePayload', messagePayload)

    socket.emit("sendMessage", messagePayload);
    setInput(""); // Clear input
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" color="textSecondary">
          Select a user to start chatting.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: "1px solid #ccc" }}>
        {selectedUser.name}
      </Typography>

      <Box sx={{ flex: 1, p: 2, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {messages.map((msg, index) => {
          const time = msg.createdAt
            ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : "";

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === currentUserId ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Paper
                sx={{
                  p: 1.5,
                  maxWidth: "60%",
                  bgcolor: msg.sender === currentUserId ? "#00ED64" : "#e0e0e0",
                  color: msg.sender === currentUserId ? "#fff" : "#000",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Paper>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, px: 1 }}
              >
                {time}
              </Typography>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
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
