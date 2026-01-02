import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InventoryOverview from './pages/InventoryOverview';
import ProductDetails from './pages/ProductDetails';
import CategoryOverview from './pages/CategoryOverview';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-custom-dark">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<InventoryOverview />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/categories" element={<CategoryOverview />} />
            <Route path="/categories/:category" element={<CategoryOverview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;


