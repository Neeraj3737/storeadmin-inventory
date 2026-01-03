import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-center py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-custom-gold rounded-2xl text-white mb-16 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-custom-gold/10 to-transparent"></div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-custom-gold to-white bg-clip-text text-transparent relative z-10">
          StoreAdmin Catalog Inventory Portal
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed relative z-10">
          Advanced inventory management system with real-time analytics, comprehensive product catalog, and intelligent search capabilities for modern retail operations
        </p>
      </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        <div className="bg-custom-dark p-10 rounded-2xl shadow-xl text-center transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl border-2 border-transparent hover:border-custom-gold/50 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-custom-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-custom-gold rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl group-hover:scale-110 transition-transform duration-300 relative z-10">
            📊
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Advanced Inventory Analytics</h2>
          <p className="text-gray-300 leading-relaxed mb-8 text-lg relative z-10">
            Comprehensive product catalog with advanced filtering, real-time search , and detailed analytics dashboard for data-driven inventory decisions.
          </p>
          <Link to="/inventory" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-custom-gold text-white px-8 py-4 rounded-xl no-underline font-semibold transition-all duration-300 hover:from-blue-700 hover:to-custom-gold/80 hover:shadow-lg transform hover:scale-105 relative z-10">
            <span>Access Inventory Portal</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-custom-dark p-10 rounded-2xl shadow-xl text-center transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl border-2 border-transparent hover:border-custom-gold/50 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-custom-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-custom-gold rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl group-hover:scale-110 transition-transform duration-300 relative z-10">
            🗂️
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Smart Category Management</h2>
          <p className="text-gray-300 leading-relaxed mb-8 text-lg relative z-10">
            Intelligent category organization with visual hierarchy, automated product classification, and cross-category analytics for optimal product placement strategies.
          </p>
          <Link to="/categories" className="inline-flex items-center bg-gradient-to-r from-purple-600 to-custom-gold text-white px-8 py-4 rounded-xl no-underline font-semibold transition-all duration-300 hover:from-purple-700 hover:to-custom-gold/80 hover:shadow-lg transform hover:scale-105 relative z-10">
            <span>Explore Categories</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="bg-custom-dark from-gray-50 to-gray-100 p-16 rounded-3xl shadow-inner border border-gray-200">
        <h2 className="text-center text-4xl font-bold text-white mb-12 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          Enterprise-Grade Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-custom-dark rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 group">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
              🔍
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI-Powered Search</h3>
            <p className="text-gray-300 leading-relaxed">Instant product discovery with intelligent fuzzy matching and predictive search suggestions</p>
          </div>
          <div className="text-center p-8 bg-custom-dark rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
              📱
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Responsive Design</h3>
            <p className="text-gray-300 leading-relaxed">Seamless experience across desktop, tablet, and mobile devices with adaptive layouts</p>
          </div>
          <div className="text-center p-8 bg-custom-dark rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 group">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-300 leading-relaxed">Optimized performance with lazy loading, caching, and efficient data structures</p>
          </div>
          <div className="text-center p-8 bg-custom-dark rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 group">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
              📈
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Advanced Analytics</h3>
            <p className="text-gray-300 leading-relaxed">Comprehensive filtering and sorting with real-time data visualization and insights</p>
          </div>
          <div className="text-center p-8 bg-custom-dark rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 group">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
              🔗
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Recommendations</h3>
            <p className="text-gray-300 leading-relaxed">AI-driven related product suggestions and cross-selling opportunities</p>
          </div>
          <div className="text-center p-8 bg-custom-dark rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 group">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
              📦
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Stock Intelligence</h3>
            <p className="text-gray-300 leading-relaxed">Real-time inventory tracking with automated alerts and stock level optimization</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


