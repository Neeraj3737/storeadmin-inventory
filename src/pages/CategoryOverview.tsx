import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategories, fetchProductsByCategory, CategoryObject } from '../services/api';
import Loading from '../components/Loading';
import ErrorDisplay from '../components/ErrorDisplay';
import InventoryOverview from './InventoryOverview';

const CategoryOverview: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryData, setCategoryData] = useState<Record<string, string | null>>({});
  const [categoryNames, setCategoryNames] = useState<Record<string, string>>({}); // Map slug to display name
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const cats = await fetchCategories();
        
        // Handle both string array and object array formats
        const categoriesArray = Array.isArray(cats) ? cats : [];
        
        // The API returns objects with {slug, name, url} format
        // Extract the slug property (which is what we use in API calls)
        const validCategories: string[] = [];
        const namesMap: Record<string, string> = {};
        
        categoriesArray.forEach((cat: CategoryObject | string) => {
          let slug: string | null = null;
          let name: string | null = null;
          
          // If it's a string, use it directly
          if (typeof cat === 'string') {
            slug = cat.trim();
            name = slug; // Use slug as name if it's a string
          }
          // If it's an object with a slug property, use the slug
          else if (cat && typeof cat === 'object' && 'slug' in cat) {
            slug = (cat as CategoryObject).slug;
            name = (cat as CategoryObject).name || slug; // Use name if available, otherwise slug
          }
          // If it's an object with a name property, convert name to slug (fallback)
          else if (cat && typeof cat === 'object' && 'name' in cat) {
            name = (cat as CategoryObject).name;
            slug = (cat as CategoryObject).name.toLowerCase().replace(/\s+/g, '-');
          }
          
          if (slug && slug.trim().length > 0) {
            validCategories.push(slug);
            namesMap[slug] = name || slug;
          }
        });
        
        setCategories(validCategories);
        setCategoryNames(namesMap);
        
        // Fetch a sample product from each category for the image
        const categoryPromises = validCategories.map(async (cat: string) => {
          try {
            const data = await fetchProductsByCategory(cat, 1);
            return { category: cat, thumbnail: data.products?.[0]?.thumbnail || null };
          } catch (err) {
            console.warn(`Failed to fetch thumbnail for category ${cat}:`, err);
            return { category: cat, thumbnail: null };
          }
        });
        
        const results = await Promise.all(categoryPromises);
        const dataMap: Record<string, string | null> = {};
        results.forEach(({ category, thumbnail }) => {
          if (category) {
            dataMap[category] = thumbnail;
          }
        });
        setCategoryData(dataMap);
      } catch (err) {
        console.error('Error loading categories:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load categories. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (cat: string) => {
    navigate(`/categories/${encodeURIComponent(cat)}`);
  };

  // If a category is selected, show the inventory overview for that category
  if (category) {
    return <InventoryOverview categoryFilter={decodeURIComponent(category)} />;
  }

  if (loading) {
    return (
      <div className="category-overview-container">
        <Loading message="Loading categories..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-overview-container">
        <ErrorDisplay message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl text-white m-0 mb-4">Product Categories</h1>
        <p className="text-lg text-gray-300 m-0 max-w-2xl mx-auto">
          Browse products by category. Click on a category to view all products in that category.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center p-12 text-gray-400 text-lg">
          <p>No categories available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map(cat => {
            if (!cat || typeof cat !== 'string') return null;
            const categorySlug = cat.trim();
            if (!categorySlug) return null;

            // Get display name from map, or format slug as fallback
            const displayName = categoryNames[categorySlug] || categorySlug
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <div
                key={categorySlug}
                className="bg-custom-dark rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg flex flex-col group border border-gray-600"
                onClick={() => handleCategoryClick(categorySlug)}
              >
                <div className="w-full pt-[75%] bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                  {categoryData[categorySlug] ? (
                    <img
                      src={categoryData[categorySlug]!}
                      alt={displayName}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                      <span className="text-6xl opacity-80">📦</span>
                    </div>
                  )}
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-2xl text-white m-0 mb-2 font-semibold">
                    {displayName}
                  </h2>
                  <p className="text-custom-gold m-0 text-base font-medium transition-colors duration-300 group-hover:text-yellow-400">Click to view products →</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryOverview;


