import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';


const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${import.meta.env.VITE_APP_API_URL}/sign-in`, formData);
    
    // Save token
    localStorage.setItem('token', res.data.token);

    // Show success alert
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Welcome back!',
      confirmButtonColor: '#00C756'
    }).then(() => {
      navigate('/user/dashboard'); // or your protected route
    });

  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: err.response?.data?.message || 'Invalid credentials or server error.',
      confirmButtonColor: '#d33'
    });
  }
};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              type="email"
              size="small"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              type="password"
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: '#00ED64',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#00C756',
                },
              }}
            >
              Sign In
            </Button>
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <NavLink
              to="/signup"
              style={{ textDecoration: 'none', color: '#1976d2' }} // customize color as needed
            >
              Sign Up
            </NavLink>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignIn;
