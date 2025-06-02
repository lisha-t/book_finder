import React from 'react';
import { Box, /*CircularProgress,*/ Typography } from '@mui/material';
import LoaderImg from '../../assets/loader.svg';
import './Loader.css';

const Loader = () => {
  return (
    <Box className="loader" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
  <img src={LoaderImg} alt="Loading..." className="loader-img" />
  {/* <CircularProgress color="inherit" size={40} thickness={4} sx={{ mt: 2 }} /> */}
  <Typography variant="h6" className="loader-text">
    Loading your books...
  </Typography>
</Box>

  );
};

export default Loader;
