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

const ChatSidebar = ({ currentUserId, onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users except current user
  const fetchUsers = async () => {
    if (!currentUserId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/all/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Filter out the current user from the list
      const filteredUsers = res.data.filter(user => user._id !== currentUserId);

      setUsers(filteredUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          {currentUserId ? `User ID: ${currentUserId}` : "Loading..."}
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
        <List sx={{ overflowY: "auto", flex: 1 }}>
          {users.length > 0 ? (
            users.map((user) => (
              <ListItem
                key={user._id}
                button
                selected={selectedUser?._id === user._id}
                onClick={() => onSelectUser(user)}
              >
                <ListItemAvatar>
                  <Avatar>{user.name?.[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))
          ) : (
            <Typography sx={{ p: 2, textAlign: "center", color: "gray" }}>
              No other users found.
            </Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default ChatSidebar;
