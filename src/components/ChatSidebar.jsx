import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";

const users = [
  { id: 1, name: "Rakesh" },
  { id: 2, name: "Jarvis" },
  { id: 3, name: "AI Bot" },
];

const ChatSidebar = () => {
  return (
    <Box sx={{ width: 300, bgcolor: "#fff", borderRight: "1px solid #ccc" }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem button key={user.id}>
            <ListItemAvatar>
              <Avatar>{user.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatSidebar;
