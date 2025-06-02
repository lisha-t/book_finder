import React from 'react';
import { Box, Container, Grid,Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/about-img.jpg';
import { FaArrowLeft } from 'react-icons/fa';
import './About.css';


const About = () => {
  const navigate = useNavigate();
  return (
    <Box className="about-section">
      <Container>
        <Button
        variant="outlined"
        startIcon={<FaArrowLeft />}
        onClick={() => navigate('/search')}
        sx={{ mb: 4 }}
      >
        Go Back
      </Button>
        <Typography variant="h2" align="center" gutterBottom className="section-title">
          About BookHub
      </Typography>
        <Grid container spacing={4} alignItems="center" className="about-row">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="about-img-wrapper">
              <img
                src={image}
                alt="Bookshelf"
                className="about-img-small"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" className="about-title" gutterBottom>
              Discover, Explore, and Read
            </Typography>
            <Typography variant="body1" className="about-text" paragraph>
              Book Finder is a modern and responsive web application designed to help users discover and explore books quickly and easily. Built using React JS, it integrates seamlessly with external book APIs(like Google Book APIs) to provide real-time search and detailed information about a wide range of books.
            </Typography>
            <Typography variant="body1" className="about-text" paragraph>
              With advanced search filters, curated recommendations, and detailed book insights, BookHub makes your reading journey smarter and more enjoyable. Join our community and explore the world of books like never before.
            </Typography>
          </Grid>
        </Grid>
        
      </Container>
    </Box>
  );
};

export default About;
