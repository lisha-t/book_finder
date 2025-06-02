import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import './SearchForm.css';

const SearchForm = () => {
  const { setSearchTerm, setResultTitle } = useGlobalContext();
  const [input, setInput] = useState('');
  const searchText = useRef(null);
  const navigate = useNavigate();
  const placeholders = ['Search for "Harry Potter"', 'Try "The Great Gatsby"','Find "Sherlock Holmes"',];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (searchText.current) {
      searchText.current.focus();
    }
    const interval = setInterval(() =>{
      setPlaceholderIndex((prev) => (prev+1) % placeholders.length);
    },2000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed.replace(/[^\w\s]/gi, '').length === 0) {
      setSearchTerm('the lost world');
      setResultTitle('Please Enter Something...');
    } else {
      setSearchTerm(trimmed);
    }
    navigate('/book');
  };

  const clearInput = () => {
    setInput('');
    searchText.current.focus();
  };

  return (
    <Box className="search-form-wrapper">
      <form onSubmit={handleSubmit}>
        <Paper elevation={4} className="search-form-paper">
          <TextField
            inputRef={searchText}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            placeholder={placeholders[placeholderIndex]}
            fullWidth
            className="search-input"
            InputProps={{
              style: { fontSize: '1.5rem' },
              endAdornment: (
                <InputAdornment position="end">
                  {input && (
                    <IconButton onClick={clearInput} aria-label="clear">
                      <ClearIcon />
                    </IconButton>
                  )}
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon md={{ color: '#010101' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </form>
    </Box>
  );
};

export default SearchForm;
