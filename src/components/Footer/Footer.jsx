// Footer.jsx
import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg" className="footer-container">
        <Typography variant="body1" className="footer-text">
          © {new Date().getFullYear()} BookHub. All rights reserved.
        </Typography>
        <Typography variant="body2" className="footer-links">
          <Link href="/about" color="inherit">About</Link> |{' '}
          <Link href="/contact" color="inherit">Contact</Link> |{' '}
          <Link href="/privacy" color="inherit">Privacy Policy</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
