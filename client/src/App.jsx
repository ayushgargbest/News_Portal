import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import NewsList from './pages/NewsList';
import Navbar from './components/Navbar';
import AddNews from './pages/AddNews';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryPage from './pages/CategoryPage';
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/add" element={<AddNews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}
