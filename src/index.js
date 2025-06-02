import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { AppProvider } from './context';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Header from './components/Header/Header'; // Adjust path if needed
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar'; // Import Navbar directly
import Signup from './pages/SignUp/Signup';
import Footer from './components/Footer/Footer';
import Favorites from './pages/Favorites';
import { CustomThemeProvider } from './ThemeContext'; 

// const ErrorPage = () => (
//   <div style={{ padding: '2rem', textAlign: 'center' }}>
//     <h1>Oops! Page not found.</h1>
//     <p>The page you’re looking for doesn’t exist.</p>
//   </div>
// );

const router = createBrowserRouter(
  [
    { path: '/', element: <><Home /></> },
    { path: '/login', element: <Login /> },
    { path: '/search', element: <><Navbar /><Header /><Footer /></>},
    { path: '/about', element: <><Navbar /><About /><Footer /></> },
    { path: '/contact', element: <><Navbar /><Contact /><Footer /></> },
    { path: '/book', element: <div className="page-wrapper"><Navbar /><BookList /><Footer /></div> },
    { path: '/book/:id', element: <><Navbar /><BookDetails /><Footer /></> },
    { path: '/signup', element: <Signup />},
    { path: '/favorites', element: (<div className="page-wrapper"><Navbar /><Favorites /><Footer /></div>) },
  
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomThemeProvider>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </CustomThemeProvider>
);
