import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../services/api';

interface ProductCardProps {
  product: Product;
  showFullDetails?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showFullDetails = false }) => {

  return (
    <Link to={`/product/${product.id}`} className="no-underline text-inherit block group">
      <div className="bg-custom-dark rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:transform hover:-translate-y-3 hover:shadow-2xl border border-gray-600 h-full flex flex-col group-hover:border-custom-gold/50">
        <div className="relative w-full pt-[75%] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              -{Math.round(product.discountPercentage)}% OFF
            </div>
          )}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-custom-gold to-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20">
            {product.category}
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-2 leading-tight line-clamp-2 group-hover:text-custom-gold transition-colors duration-300">{product.title}</h3>
          {showFullDetails && (
            <>
              <p className="text-sm text-gray-00 mb-2 flex items-center">
                <span className="font-medium text-white">Brand:</span>
                <span className="ml-2 bg-gray-500 px-2 py-1 rounded-md text-white">{product.brand}</span>
              </p>
            </>
          )}
          <div className="flex justify-between items-center mt-auto pt-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-custom-gold">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  ${((product.price * 100) / (100 - product.discountPercentage)).toFixed(2)}
                </span>
              )}
            </div>
            <div className={`text-sm px-3 py-1 rounded-full font-semibold shadow-sm ${
              product.stock > 0 ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </div>
          </div>
          {product.rating && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-custom-gold text-lg drop-shadow-sm">★</span>
                <span className="text-gray-300 font-semibold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">{product.reviews?.length || 0} reviews</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;



