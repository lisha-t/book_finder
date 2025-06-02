import React, { useState } from 'react';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Button, Snackbar, Alert } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import Book from '../components/BookList/Book';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useGlobalContext();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromFavorites(id);
    setSnackMsg('Removed from favorites');
    setSnackOpen(true);
  };

  return (
    <Container sx={{ py: 6 }}>
      <Button
        variant="outlined"
        startIcon={<FaArrowLeft />}
        onClick={() => navigate('/search')}
        sx={{ mb: 4 }}
      >
        Go Back
      </Button>
      <Typography variant="h4" gutterBottom>
        Your Favorite Books
      </Typography>
      
      {favorites.length === 0 ? (
        <Typography variant="body5">No favorites yet.</Typography>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Book {...book} onRemove={() => handleRemove(book.id)}/>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity="info" sx={{ width: '100%' }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Favorites;
