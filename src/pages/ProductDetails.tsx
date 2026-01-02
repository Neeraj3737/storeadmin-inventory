import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct, fetchProductsByCategory, Product } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorDisplay from '../components/ErrorDisplay';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingSimilar, setLoadingSimilar] = useState<boolean>(false);

  // ✅ NEW: selected image state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);
      try {
        const data = await fetchProduct(id);
        setProduct(data);
        // ✅ default big image
        setSelectedImage(data.thumbnail);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load product';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    const loadSimilarProducts = async () => {
      if (!product?.category) return;

      setLoadingSimilar(true);
      try {
        const data = await fetchProductsByCategory(product.category, 6);
        const filtered = data.products.filter(p => p.id !== product.id);
        setSimilarProducts(filtered.slice(0, 5));
      } catch (err) {
        console.error('Error loading similar products:', err);
      } finally {
        setLoadingSimilar(false);
      }
    };

    loadSimilarProducts();
  }, [product]);

  if (loading) {
    return (
      <div className="product-details-container">
        <Loading message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-container">
        <ErrorDisplay
          message={error || 'Product not found'}
          onRetry={() => navigate('/inventory')}
        />
      </div>
    );
  }

  const stockStatus = product.stock > 0 ? 'In Stock' : 'Out of Stock';

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white border-none px-4 py-2 rounded-lg text-base cursor-pointer mb-8 transition-colors duration-300 hover:bg-gray-600"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 bg-white p-8 rounded-xl shadow-md">
        
        {/* IMAGE SECTION */}
        <div className="flex flex-col gap-4">
          {/* Big Image */}
          <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain transition-opacity duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                  className={`w-full aspect-square object-cover rounded cursor-pointer transition-all duration-300
                    ${
                      selectedImage === image
                        ? 'ring-2 ring-[#FFD369] opacity-100'
                        : 'hover:opacity-80'
                    }
                  `}
                />
              ))}
            </div>
          )}
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl text-gray-800 m-0 leading-tight">
            {product.title}
          </h1>

          <div className="flex flex-col gap-2 pb-4 border-b border-gray-200">
            <span className="text-gray-500 text-base">
              Brand: {product.brand}
            </span>
            <span className="text-gray-500 text-base">
              Category: {product.category}
            </span>

            {product.rating && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-xl">
                  {'★'.repeat(Math.floor(product.rating))}
                </span>
                <span className="font-semibold text-gray-800">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-gray-500 text-sm">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-3xl font-bold text-green-600">
              ${product.price}
            </span>

            {product.discountPercentage > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  $
                  {(
                    (product.price * 100) /
                    (100 - product.discountPercentage)
                  ).toFixed(2)}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>

          <div
            className={`p-4 rounded-lg text-base ${
              product.stock > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            <strong>Stock Status:</strong> {stockStatus} ({product.stock} units
            available)
          </div>

          {product.description && (
            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-2xl text-gray-800 m-0 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {product.description}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-2xl text-gray-800 m-0 mb-4">Product Details</h2>
            <ul className="list-none p-0 m-0">
              <li className="py-2 text-gray-700 border-b border-gray-100">
                <strong className="text-gray-800 mr-2">Brand:</strong>{' '}
                {product.brand}
              </li>
              <li className="py-2 text-gray-700 border-b border-gray-100">
                <strong className="text-gray-800 mr-2">Category:</strong>{' '}
                {product.category}
              </li>
              <li className="py-2 text-gray-700 border-b border-gray-100">
                <strong className="text-gray-800 mr-2">Price:</strong> $
                {product.price}
              </li>
              <li className="py-2 text-gray-700 border-b border-gray-100">
                <strong className="text-gray-800 mr-2">Stock:</strong>{' '}
                {product.stock} units
              </li>
              {product.rating && (
                <li className="py-2 text-gray-700">
                  <strong className="text-gray-800 mr-2">Rating:</strong>{' '}
                  {product.rating.toFixed(1)}/5.0
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-16 pt-8 border-t-2 border-gray-200">
          <h2 className="text-2xl text-gray-800 m-0 mb-8">
            Browse Similar Products
          </h2>

          {loadingSimilar ? (
            <Loading message="Loading similar products..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {similarProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
