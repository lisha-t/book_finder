import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Paper,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const messages = JSON.parse(sessionStorage.getItem('contactMessages')) || [];
    messages.push(formData);
    sessionStorage.setItem('contactMessages', JSON.stringify(messages));

    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container className="contact-container">
      <Button
        variant="outlined"
        startIcon={<FaArrowLeft />}
        onClick={() => navigate('/search')}
        sx={{ mb: 4 }}
      >
        Go Back
      </Button>
      <Typography variant="h2" className="contact-title" gutterBottom>
        Contact Me
      </Typography>
      <Typography variant="body1" className="contact-subtitle">
        Feel free to reach out through the form or connect with me directly.
      </Typography>

 
      <Paper elevation={4} className="contact-paper">
        <Box className="contact-info-item">
          <EmailIcon className="contact-icon" />
          <Link href="mailto:your.email@example.com" underline="hover">
            lishat@gmail.com
          </Link>
        </Box>
        <Box className="contact-info-item">
          <LinkedInIcon className="contact-icon" />
          <Link href="https://linkedin.com/in/yourprofile" target="_blank" underline="hover">
            linkedin.com/in/lisha-t
          </Link>
        </Box>
        <Box className="contact-info-item">
          <GitHubIcon className="contact-icon" />
          <Link href="https://github.com/lisha_t" target="_blank" underline="hover">
            github.com/lisha_t_gowda
          </Link>
        </Box>
      </Paper>

      <Paper elevation={4} className="contact-form-box">
        <Typography variant="h5" className="form-title" gutterBottom>
          Send a Message
        </Typography>
        <Box component="form" className="contact-form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            required
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Message"
            name="message"
            multiline
            rows={4}
            fullWidth
            required
            margin="normal"
            value={formData.message}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" className="contact-button">
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;
