import React from "react";
import { Box } from "@mui/material";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";

function ChatDashboard() {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      <ChatSidebar />
      <ChatWindow />
    </Box>
  );
}

export default ChatDashboard;
