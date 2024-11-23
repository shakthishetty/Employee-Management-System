import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Box, CircularProgress, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data: { data } } = await axios.get('http://localhost:4000/api/employee/v1/employees');
        setEmployees(data);
      } catch (error) {
        console.error('Failed to fetch employees', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(({ userName, email }) =>
    userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-employee/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/employee/v1/employees/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter(employee => employee._id !== id));
      // alert("Employee deleted successfully!");
      toast.success("Employee deleted successfully!")
    } catch (error) {
      console.error("Failed to delete employee", error);
      // alert("There was an error deleting the employee.");
      toast.error("There was an error deleting the employee.")

    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom align="center">
        Employee List
      </Typography>

     
      <Box mb={3} display="flex" justifyContent="center">
        <TextField
          label="Search by Username or Email"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            maxWidth: 400,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              padding: '10px 15px',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>CreatedAt</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map(({ userName, email, mobile, gender, designation, image, course, createdAt, _id }) => (
                <TableRow key={_id}>
                  <TableCell>{userName}</TableCell>
                  <TableCell>{email}</TableCell>
                 
                  <TableCell>
                  <img
  src={`http://localhost:4000/${image}`}
  alt="Employee"
  style={{ width: 50, height: 50, borderRadius: "50%" }}
   
/>
</TableCell>         
   
                  
                  <TableCell>{mobile}</TableCell>
                  <TableCell>{gender}</TableCell>
                  <TableCell>{designation}</TableCell>
                  <TableCell>{course}</TableCell>
                  <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(_id)} color="primary" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(_id)} color="secondary" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EmployeeList;
