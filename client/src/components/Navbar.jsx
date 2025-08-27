import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="bg-red-700 py-1">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="bg-white text-red-700 px-2 py-0.5 text-xs font-bold rounded">
              LIVE
            </span>
            <span className="animate-pulse">
              🔴 Breaking: Stay updated with latest news
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-red-100 transition-colors"
          >
            📰 News Today
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-red-200 transition-colors">
              Home
            </Link>

            <div className="relative group">
              <button className="hover:text-red-200 transition-colors flex items-center">
                Categories ⌄
              </button>
              <div className="absolute top-full left-0 bg-white text-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 mt-1">
                <Link
                  to="/category/politics"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-t-lg"
                >
                  🏛️ Politics
                </Link>
                <Link
                  to="/category/business"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  💼 Business
                </Link>
                <Link
                  to="/category/technology"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  💻 Technology
                </Link>
                <Link
                  to="/category/sports"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  ⚽ Sports
                </Link>
                <Link
                  to="/category/health"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
                >
                  🏥 Health
                </Link>
                <Link
                  to="/category/entertainment"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-red-600 rounded-b-lg"
                >
                  🎬 Entertainment
                </Link>
              </div>
            </div>

            {isLoggedIn && (
              <Link to="/add" className="hover:text-red-200 transition-colors">
                Add News
              </Link>
            )}

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="hover:text-red-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg transition-all hover:shadow-md"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-red-200">👋 Welcome!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg transition-all hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
