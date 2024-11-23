import { Box, Button, CircularProgress, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    userName: '',
    email: '',
    mobile: '',
    gender: '',
    designation: '',
    course: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/employee/v1/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Failed to fetch employee data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/employee/v1/employees/${id}`,
        employee
      );
      if (response.status === 200) {
        toast.success("Employee Edited Succefully")
        navigate("/dashboard/employee-list"); 
      }
    } catch (error) {
      console.error('Failed to update employee', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ padding: '40px 20px', maxWidth: 900, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Edit Employee
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ padding: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Username"
                  name="userName"
                  value={employee.userName}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={employee.mobile}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                  type="tel"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gender"
                  name="gender"
                  value={employee.gender}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Designation"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Course"
                  name="course"
                  value={employee.course}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Image URL"
                  name="image"
                  value={employee.image}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ padding: '10px 20px' }}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          </form>
        </Paper>
      )}
    </Box>
  );
};

export default EditEmployee;
