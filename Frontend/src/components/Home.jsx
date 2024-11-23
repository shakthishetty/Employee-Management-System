import { AppBar, Box, Button, Card, CardContent, Container, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [greeting, setGreeting] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            DEALSDRAY ONLINE PVT.LTD
          </Typography>
          <Button color="inherit" onClick={handleMenuOpen}>Menu</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleNavigate('/')}>Home</MenuItem>
            <MenuItem onClick={() => handleNavigate('/create-employee')}>Create Employee</MenuItem>
            <MenuItem onClick={() => handleNavigate('/login')}>Login</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {greeting}, Welcome to the Employee Portal
        </Typography>
        <Card sx={{ maxWidth: 600, margin: '0 auto', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Manage Your Employees Efficiently
            </Typography>
            <Typography variant="body1">
              Use this portal to create, manage, and view employee details. You can also upload their profile pictures, assign them to courses, and much more. Begin by adding a new employee.
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginRight: 2 }}
            onClick={() => navigate('/')}
          >
            Add New Employee
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
