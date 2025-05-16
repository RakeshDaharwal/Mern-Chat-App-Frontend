

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import socket from "../utils/socket";
import axios from "axios";

const ChatWindow = ({ selectedUser, currentUserId, messages, fetchMessages }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuMsgId, setMenuMsgId] = useState(null);

  const handleMenuOpen = (event, msgId) => {
    setAnchorEl(event.currentTarget);
    setMenuMsgId(msgId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuMsgId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}/chat/${menuMsgId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      handleMenuClose();
      fetchMessages(); // Refresh messages after deletion
    } catch (err) {
      console.error("Failed to delete message", err);
    }
  };

  const handleSend = () => {
    if (!input.trim() || !selectedUser || !currentUserId) return;

    const messagePayload = {
      sender: currentUserId,
      receiver: selectedUser._id,
      text: input,
    };

    socket.emit("sendMessage", messagePayload);
    setInput("");
  };

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
        {messages.map((msg) => {
          const time = msg.createdAt
            ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : "";

          return (
            <Box
              key={msg._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === currentUserId ? "flex-end" : "flex-start",
                mb: 1,
                position: "relative",
              }}
            >
              <Paper
                sx={{
                  p: 1,
                  px: 3,
                  maxWidth: "60%",
                  bgcolor: msg.sender === currentUserId ? "#00ED64" : "#e0e0e0",
                  color: msg.sender === currentUserId ? "#fff" : "#000",
                  borderRadius: 2,
                  position: "relative",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>

                {msg.sender === currentUserId && (
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, msg._id)}
                    sx={{
                      position: "absolute",
                      top: -5,
                      right: -5,
                      color: "#555",
                      background: "none",
                      "&:hover": {
                        background: "none",
                      },
                    }}
                  >
                    <ArrowDropDownIcon fontSize="small" />
                  </IconButton>

                )}
              </Paper>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, px: 1 }}>
                {time}
              </Typography>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

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
