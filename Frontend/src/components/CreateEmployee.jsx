import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(8),
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    userName: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    password: "",
    confirmPassword: "",
    image: null,
  });


  const [fileName, setFileName] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const notify = () => toast("Wow so easy!");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setSelectedCourses(value);
    setEmployeeData((prev) => ({ ...prev, course: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEmployeeData((prev) => ({ ...prev, image: file }));
    setFileName(file?.name || "");
    toast.success("Image Added Succefully!")
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setError("");

    
    if (employeeData.password !== employeeData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    
    const formData = new FormData();
    for (const key in employeeData) {
      formData.append(key, employeeData[key]);
    }

    try {
      await axios.post(
        "http://localhost:4000/api/employee/v1/employees",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Employee created successfully!");
     
      navigate("/login");
    } catch (error) {
      console.error("Error creating employee:", error);
      
      if (
        error.response &&
        error.response.status === 409
      ) {
        setError("User already exists. Please use a different email or mobile");
      } else {
        setError("Error creating employee. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledCard>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          Register Employee
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          sx={{ marginBottom: 3 }}
        >
          Fill in the form below to create a new employee profile.
        </Typography>
        {error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ marginBottom: 2 }}
          >
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="userName"
            value={employeeData.userName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            type="email"
            value={employeeData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Mobile"
            variant="outlined"
            fullWidth
            margin="normal"
            name="mobile"
            type="tel"
            value={employeeData.mobile}
            onChange={handleChange}
            required
            inputProps={{
              pattern: "[0-9]{10}",
              title: "Enter a valid 10-digit mobile number",
            }}
          />
          <TextField
            label="Designation"
            variant="outlined"
            fullWidth
            margin="normal"
            name="designation"
            value={employeeData.designation}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={employeeData.gender}
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Courses</InputLabel>
            <Select
              name="course"
              multiple
              value={selectedCourses}
              onChange={handleCourseChange}
            >
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Node.js">Node.js</MenuItem>
              <MenuItem value="MongoDB">MongoDB</MenuItem>
              <MenuItem value="Express">Express</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={employeeData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="confirmPassword"
            type="password"
            value={employeeData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Box mt={2}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="image-upload">
              <StyledButton
                variant="contained"
                component="span"
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload Image
              </StyledButton>
            </label>
            {fileName && (
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ fontStyle: "italic" }}
              >
                {fileName}
              </Typography>
            )}
          </Box>
          <StyledButton type="submit" variant="contained" fullWidth>
            Register
          </StyledButton>
        </form>
      </StyledCard>
    </Container>
  );
};

export default CreateEmployee;
