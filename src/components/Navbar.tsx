import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-4 shadow-2xl sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
        <Link to="/" className="flex items-center no-underline text-white text-2xl font-bold transition-all duration-300 hover:scale-105 group">
          <div className="w-10 h-10 bg-gradient-to-br from-custom-gold to-yellow-500 rounded-xl flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-custom-gold/30">
            <span className="text-xl">📦</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium opacity-80 text-custom-gold">StoreAdmin</span>
            <span className="text-lg leading-tight">Catalog Portal</span>
          </div>
        </Link>
        <div className="flex gap-8 md:gap-8">
          <Link
            to="/"
            className={`text-white no-underline px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-10 font-medium relative group ${
              location.pathname === '/' ? 'bg-gradient-to-r from-custom-gold to-yellow-500 shadow-lg shadow-custom-gold/30' : ''
            }`}
          >
            <span className="relative z-10">Dashboard</span>
            {location.pathname === '/' && (
              <div className="absolute inset-0 bg-gradient-to-r from-custom-gold to-yellow-500 rounded-xl opacity-100 shadow-lg shadow-custom-gold/30"></div>
            )}
          </Link>
          <Link
            to="/inventory"
            className={`text-white no-underline px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-10 font-medium relative group ${
              location.pathname === '/inventory' ? 'bg-gradient-to-r from-custom-gold to-yellow-500 shadow-lg shadow-custom-gold/30' : ''
            }`}
          >
            <span className="relative z-10">Inventory</span>
            {location.pathname === '/inventory' && (
              <div className="absolute inset-0 bg-gradient-to-r from-custom-gold to-yellow-500 rounded-xl opacity-100 shadow-lg shadow-custom-gold/30"></div>
            )}
          </Link>
          <Link
            to="/categories"
            className={`text-white no-underline px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:bg-opacity-10 font-medium relative group ${
              location.pathname === '/categories' ? 'bg-gradient-to-r from-custom-gold to-yellow-500 shadow-lg shadow-custom-gold/30' : ''
            }`}
          >
            <span className="relative z-10">Categories</span>
            {location.pathname === '/categories' && (
              <div className="absolute inset-0 bg-gradient-to-r from-custom-gold to-yellow-500 rounded-xl opacity-100 shadow-lg shadow-custom-gold/30"></div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


