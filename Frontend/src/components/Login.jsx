import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '' });
    setErrorMessage('');

    let formValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
      formValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      formValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      formValid = false;
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/employee/v1/loginEmployee', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const { userName, token } = response.data;
        localStorage.setItem('username', userName);
        localStorage.setItem('token', token);
        // alert('Login successful');
        toast.success('Login successful')
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8 }}>
        <Card sx={{ padding: 4, boxShadow: 3, borderRadius: '8px' }}>
          <Stack component="form" onSubmit={handleSubmit} spacing={3}>
            <Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>
              Login
            </Typography>

            <Typography variant="body2" align="center" sx={{ color: 'gray', marginBottom: 2 }}>
              Please enter your email and password to log in.
            </Typography>

           
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: '#f9f9f9' }}
            />

          
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              size="small"
              sx={{ backgroundColor: '#f9f9f9' }}
            />

          
            {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}

            <Box display="flex" flexDirection="column" alignItems="center">
            
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#1565c0' },
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  borderRadius: '6px',
                  textTransform: 'none',
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <Divider sx={{ width: '100%', marginY: 2 }} />

              
              <Typography variant="body2" align="center">
                Don’t have an account?{' '}
                <Button
                  sx={{ textTransform: 'none', padding: 0 }}
                  onClick={() => navigate('/')}
                >
                  Sign Up
                </Button>
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
