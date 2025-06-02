import React, { useState } from 'react';
import { useGlobalContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import Book from './Book';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loading from '../Loader/Loader';
import coverImg from '../../assets/library-img.jpg';
import { FaArrowLeft } from 'react-icons/fa';
import { Container, Grid, Typography, Button, Pagination, Box } from '@mui/material';

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;
  const navigate = useNavigate();

  const booksWithCovers = books.map((book) => ({
    ...book,
    id: book.id.replace('/works/', ''),
    cover_img: book.cover_id
      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
      : coverImg,
  }));

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = booksWithCovers.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loading />;

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
        {resultTitle}
      </Typography>
      <Grid container spacing={4}>
        {currentBooks.map((book, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <Book {...book} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={2}>
  <ArrowBackIosNewIcon
    fontSize="large"
    onClick={() => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }}
    style={{
      cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
      opacity: currentPage > 1 ? 1 : 0.5,
    }}
  />

  <Pagination
    count={Math.ceil(booksWithCovers.length / booksPerPage)}
    page={currentPage}
    onChange={handlePageChange}
    color="primary"
    shape="rounded"
    size="large"
  />

  <ArrowForwardIosIcon
    fontSize="large"
    onClick={() => {
      if (currentPage < Math.ceil(booksWithCovers.length / booksPerPage)) {
        setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }}
    style={{
      cursor: currentPage < Math.ceil(booksWithCovers.length / booksPerPage) ? 'pointer' : 'not-allowed',
      opacity: currentPage < Math.ceil(booksWithCovers.length / booksPerPage) ? 1 : 0.5,
    }}
  />
</Box>

    </Container>
  );
};

export default BookList;
