import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

const Header = () => {
  return (
    <Box className="header-content">
      <Container maxWidth="md" sx={{ textAlign: 'center', color: '#fff' }}>
        <Typography variant="h1" className="header-title" gutterBottom>
        Find  your  book  of  choice. . . ! ! !
        </Typography>
        <Typography variant="body1" className="header-text">
          Discover a world of knowledge and imagination. Search for your favorite books now.
        </Typography>
        <SearchForm />
      </Container>
    </Box>
  );
};

export default Header;
