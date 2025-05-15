import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
<AppBar position="static" elevation={1} sx={{ backgroundColor: '#E6F4EA' }}>
  <Toolbar sx={{ justifyContent: 'space-between' }}>
  
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00AD4F' }}>
      ChatApp
    </Typography>

    <Box>
        <NavLink to='/signin'>
      <Button
        variant="outlined"
        sx={{
          mr: 2,
          borderColor: '#00ED64',
          color: '#00AD4F',
          '&:hover': {
            backgroundColor: '#D1FADF',
            borderColor: '#00C756',
          },
        }}
      >
        Sign In
      </Button>
</NavLink>
<NavLink to='/signup'>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#00ED64',
          color: '#000',
          '&:hover': {
            backgroundColor: '#00C756',
          },
        }}
      >
        Sign Up
      </Button>
      </NavLink>
    </Box>
  </Toolbar>
</AppBar>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)', // Full height minus navbar
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Welcome to ChatApp
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            A real-time chat application to connect with your friends instantly and securely.
          </Typography>
          <NavLink to='/user/dashboard'>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              backgroundColor: '#00ED64',
              color: '#000',
              '&:hover': {
                backgroundColor: '#00c755',
              },
            }}
          >
            Get Started
          </Button>
          </NavLink>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
