import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('the lost world');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // ✅ Auth state

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  const signup = () => setIsAuthenticated(false);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = sessionStorage.getItem('favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const updateSession = (data) => {
    sessionStorage.setItem('favorites', JSON.stringify(data));
  };

  const addToFavorites = (book) => {
    const updated = [...favorites, book];
    setFavorites(updated);
    updateSession(updated);
  };

  const removeFromFavorites = (id) => {
    const updated = favorites.filter((book) => book.id !== id);
      setFavorites(updated);
      updateSession(updated);
  };

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${searchTerm}`);
      const data = await response.json();

      const { docs } = data;

      if (docs && docs.length > 0) {
        const newBooks = docs.slice(0, 20).map((book) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
          } = book;

          return {
            id: key,
            author: author_name,
            cover_id: cover_i,
            edition_count,
            first_publish_year,
            title,
          };
        });

        setBooks(newBooks);
        setResultTitle(newBooks.length > 1 ? 'Your Search Results' : 'No Search Result Found!');
      } else {
        setBooks([]);
        setResultTitle('No Search Result Found!');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
      setResultTitle('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
        isAuthenticated,
        login,
        logout,
        signup,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
