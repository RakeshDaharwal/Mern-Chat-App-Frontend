import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const ChatSidebar = ({ currentUserId, onSelectUser, currentUserName }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/all/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredUsers = res.data.filter((user) => user._id !== currentUserId);
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  return (
    <Box
      sx={{
        width: 300,
        bgcolor: "#f9f9f9",
        borderRight: "1px solid #ccc",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2, bgcolor: "#00ED64", color: "#fff" }}>
        <Typography variant="h6">
          {currentUserName}
        </Typography>
      </Box>

      <Divider />

      <Typography variant="subtitle1" sx={{ p: 2, fontWeight: 500 }}>
        Users
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <List>
          {users.length > 0 ? (
            users.map((user) => (
              <ListItem key={user._id} button onClick={() => onSelectUser(user)}>
                <ListItemAvatar>
                  <Avatar>{user.name?.[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ p: 2, textAlign: "center", color: "gray" }}>
              No users found.
            </Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default ChatSidebar;
