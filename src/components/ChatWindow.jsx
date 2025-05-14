import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "me" }]);
      setInput("");
    }
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: "1px solid #ccc" }}>
        Chat
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
              bgcolor: msg.sender === "me" ? "#1976d2" : "#e0e0e0",
              color: msg.sender === "me" ? "#fff" : "#000",
              borderRadius: 2,
            }}
          >
            {msg.text}
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
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton onClick={handleSend} color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWindow;
