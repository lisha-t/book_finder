import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import Loading from '../Loader/Loader';
import coverImg from '../../assets/copyImage.jpg';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
} from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import './BookDetails.css';

const URL = 'https://openlibrary.org/works/';

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useGlobalContext();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const getBookDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;

          const newBook = {
            description: description?.value || 'No description found',
            title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            // subject_places: subject_places?.join(', ') || 'No subject places found',
            // subject_times: subject_times?.join(', ') || 'No subject times found',
            subjects: subjects?.join(', ') || 'No subjects found',
          };

          setBook(newBook);
        } else {
          setBook(null);
        }
      } catch (error) {
        console.error(error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    getBookDetails();
  }, [id, isAuthenticated, navigate]);

  if (loading) return <Loading />;

  return (
    <Container maxWidth="md" className="book-details">
      <Button
        variant="outlined"
        startIcon={<FaArrowLeft />}
        onClick={() => navigate('/book')}
        className="back-btn"
      >
        Go Back
      </Button>

      <Paper elevation={4} className="book-details-paper">
        <Box className="book-details-img">
          <img src={book?.cover_img} alt="cover" />
        </Box>

        <Box className="book-details-info">
          <Typography variant="h3" className="book-title" gutterBottom>
            {book?.title}
          </Typography>

          <Typography variant="h5" className="book-description" paragraph>
            {book?.description}
          </Typography>

          <Typography variant="h6" className="book-meta">
            <strong>Subject Places:</strong> {book?.subject_places}
          </Typography>
          <Typography variant="h6" className="book-meta">
            <strong>Subject Times:</strong> {book?.subject_times}
          </Typography>
          <Typography variant="h6" className="book-meta">
            <strong>Subjects:</strong> {book?.subjects}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookDetails;
