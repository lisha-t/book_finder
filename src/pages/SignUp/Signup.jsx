import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import './Signup.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      alert('Username already exists');
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful!');
    navigate('/login');
  };

  return (
    <Box className="signup-background">
      <Container maxWidth="sm">
        <Paper elevation={6} className="signup-paper">
          <Typography variant="h4" className="signup-title">
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} className="signup-form">
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              InputProps={{ style: { fontSize: '1.3rem' } }}
              InputLabelProps={{ style: { fontSize: '1.3rem' } }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              InputProps={{ style: { fontSize: '1.3rem' } }}
              InputLabelProps={{ style: { fontSize: '1.3rem' } }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              InputProps={{ style: { fontSize: '1.3rem' } }}
              InputLabelProps={{ style: { fontSize: '1.3rem' } }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{ style: { fontSize: '1.3rem' } }}
              InputLabelProps={{ style: { fontSize: '1.3rem' } }}
            />
            <Box className="signup-links">
              <Link to="/login" className="signup-link">Already have an account? Log in</Link>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="signup-button"
            >
              <h4>Sign Up</h4>
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUpPage;
