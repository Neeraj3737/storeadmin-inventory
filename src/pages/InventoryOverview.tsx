import React, { useState, useEffect, useMemo } from 'react';
import {
  fetchProducts,
  searchProducts,
  fetchCategories,
  fetchProductsByCategory,
  Product,
  CategoryObject
} from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import ErrorDisplay from '../components/ErrorDisplay';

interface InventoryOverviewProps {
  categoryFilter?: string | null;
}

/* 🔹 Helper: Shuffle array (for random initial load) */
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const InventoryOverview: React.FC<InventoryOverviewProps> = ({
  categoryFilter: initialCategoryFilter = null
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(
    initialCategoryFilter
  );

  const [skip, setSkip] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const limit = 20;

  /* 🔹 Fetch categories */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        const validCategories = (Array.isArray(cats) ? cats : [])
          .map((cat: CategoryObject | string): string | null => {
            if (typeof cat === 'string') return cat.trim();
            if (cat && typeof cat === 'object' && 'slug' in cat)
              return (cat as CategoryObject).slug;
            if (cat && typeof cat === 'object' && 'name' in cat)
              return (cat as CategoryObject).name
                .toLowerCase()
                .replace(/\s+/g, '-');
            return null;
          })
          .filter((cat): cat is string => !!cat);

        setCategories(validCategories);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    loadCategories();
  }, []);

  /* 🔹 Fetch products */
  useEffect(() => {
    const loadProducts = async () => {
      if (isSearching) return;

      setLoading(true);
      setError(null);

      try {
        if (initialCategoryFilter) {
          const data = await fetchProductsByCategory(
            initialCategoryFilter,
            limit * 2
          );
          setProducts(shuffleArray(data.products || []));
          setHasMore(false);
        } else {
          const data = await fetchProducts(limit, skip);
          setProducts(prev =>
            skip === 0
              ? shuffleArray(data.products)
              : [...prev, ...data.products]
          );
          setHasMore(data.products.length === limit);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [skip, isSearching, initialCategoryFilter]);

  /* 🔹 Search */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setSkip(0);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsSearching(true);
      setLoading(true);
      try {
        const data = await searchProducts(searchQuery);
        setProducts(data.products || []);
        setHasMore(false);
      } catch {
        setError('Failed to search products');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  /* 🔹 Filter + Sort (sort only if user selected) */
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (sortBy) {
      result.sort((a, b) =>
        sortBy === 'name'
          ? a.title.localeCompare(b.title)
          : a.price - b.price
      );
    }

    return result;
  }, [products, categoryFilter, sortBy]);

  const loadMore = () => {
    if (!loading && hasMore && !isSearching) {
      setSkip(prev => prev + limit);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value || null);
  };

  if (error && products.length === 0) {
    return (
      <ErrorDisplay
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="bg-custom-dark min-h-screen max-w-7xl mx-auto px-6 py-8">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#FFD369]">
          {initialCategoryFilter
            ? `${initialCategoryFilter} Collection`
            : 'StoreAdmin Inventory Portal'}
        </h1>
        <p className="text-[#FFD369] mt-3">
          Manage products with search, filters, and sorting
        </p>
      </div>

      {/* SEARCH + FILTER + SORT */}
      <div className="flex flex-wrap lg:flex-nowrap gap-6 mb-12 p-8 rounded-2xl shadow-xl border border-gray-700">

        {/* SEARCH */}
        <div className="relative w-full lg:flex-[2]">
          <label className="block text-sm font-semibold text-[#FFD369] mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-4 text-lg border-2 border-gray-600 rounded-xl bg-black text-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white w-8 h-8 rounded-full"
            >
              ×
            </button>
          )}
        </div>

        {/* CATEGORY */}
        {!initialCategoryFilter && (
          <div className="w-full lg:flex-1 min-w-[220px]">
            <label className="block text-sm font-semibold text-[#FFD369] mb-2">
              Product Category
            </label>
            <select
              value={categoryFilter || ''}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl bg-black text-white"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* SORT */}
        <div className="w-full lg:flex-1 min-w-[220px]">
          <label className="block text-sm font-semibold text-[#FFD369] mb-2">
            Sort Products
          </label>
          <select
            value={sortBy ?? ''}
            onChange={e =>
              setSortBy(
                e.target.value
                  ? (e.target.value as 'name' | 'price')
                  : null
              )
            }
            className="w-full px-4 py-3 border-2 border-gray-600 rounded-xl bg-black text-white"
          >
            <option value="">None</option>
            <option value="name">Name (A–Z)</option>
            <option value="price">Price (Low → High)</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS / LOADING */}
      {loading && products.length === 0 ? (
        <div className="min-h-[60vh] flex items-center justify-center bg-custom-dark">
          <Loading message="Loading products..." />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showFullDetails
              />
            ))}
          </div>

          {hasMore && !isSearching && !categoryFilter && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-[#FFD369] text-black px-10 py-4 rounded-2xl font-bold"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InventoryOverview;
