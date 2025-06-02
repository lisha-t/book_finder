
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      login();
      navigate('/search');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box className="login-background">
      <Container maxWidth="sm">
        <Paper elevation={6} className="login-paper">
          <Typography variant="h4" className="login-title">
            Login Page
          </Typography>
          <Box component="form" onSubmit={handleSubmit} className="login-form">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{ style: { fontSize: '1.3rem' } }}
              InputLabelProps={{ style: { fontSize: '1.3rem' } }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ style: { fontSize: '1.3rem' } }}
              InputLabelProps={{ style: { fontSize: '1.3rem' } }}
            />
            <Box className="login-links">
              <Link to="/forgot-password" className="login-link">Forgot Password?</Link>
              <Link to="/signup" className="login-link">New User? Sign Up</Link>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="login-button"
            >
              <h4>Login</h4>
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
