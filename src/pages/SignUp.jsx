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


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
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
     await axios.post(`${import.meta.env.VITE_APP_API_URL}/register`, formData);
      
      navigate('/signin')
     
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
    }
  };

  return (
    <>
     <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5', // optional: light background
    }}
  >
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4}}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            size="small"
          />
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
            Sign Up
          </Button>
        </Box>
           <Typography variant="body2" align="center" sx={{ mt: 2 }}>
             Already have an account?{' '}
             <NavLink
               to="/signin"
               style={{ textDecoration: 'none', color: '#1976d2' }} // customize color as needed
             >
               Sign In
             </NavLink>
           </Typography>       
      </Paper>
    </Container>
    </Box>
    </>
  );
};

export default SignUp;
