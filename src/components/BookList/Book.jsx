import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  IconButton,
  CardActions,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useGlobalContext } from '../../context';

const Book = ({ id, title, author, edition_count, first_publish_year, cover_img }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useGlobalContext();
  const isFav = favorites.some((book) => book.id === id);

  const [snackOpen, setSnackOpen] = useState(false);
const [snackMsg, setSnackMsg] = useState('');

const toggleFavorite = () => {
  const bookData = { id, title, author, edition_count, first_publish_year, cover_img };
  if (isFav) {
    removeFromFavorites(id);
    setSnackMsg('Removed from favorites');
  } else {
    addToFavorites(bookData);
    setSnackMsg('Added to favorites');
  }
  setSnackOpen(true);
};


  return (
    <Card sx={{ maxWidth: 280, mx: 'auto', boxShadow: 3, borderRadius: 2, position: 'relative' }}>
      <CardActionArea component={Link} to={`/book/${id}`}>
        <CardMedia
          component="img"
          height="360"
          image={cover_img}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Author:</strong> {author?.join(', ') || 'Unknown'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Editions:</strong> {edition_count}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>First Published:</strong> {first_publish_year}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
        <IconButton onClick={toggleFavorite} color="secondary">
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    
    <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
      <MuiAlert onClose={() => setSnackOpen(false)} severity="info" sx={{ width: '100%' }}>
        {snackMsg}
      </MuiAlert>
    </Snackbar>
    </Card>
  );
};

export default Book;
