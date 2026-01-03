// API service for fetching data from DummyJSON API

const API_BASE_URL = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews?: Review[];
}

export interface Review {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoryObject {
  slug: string;
  name: string;
  url: string;
}

/**
 * Fetch all products with pagination
 */
export const fetchProducts = async (limit: number = 30, skip: number = 0): Promise<ProductsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 */
export const fetchProduct = async (id: number | string): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Search products by query
 */
export const searchProducts = async (query: string): Promise<ProductsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

/**
 * Fetch all categories
 * Returns an array of category objects with {slug, name, url} or an array of strings
 */
export const fetchCategories = async (): Promise<(CategoryObject | string)[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // DummyJSON API returns an array of category objects with {slug, name, url}
    // or an array of strings
    if (Array.isArray(data)) {
      return data;
    }
    
    // Fallback: if it's wrapped in an object
    if (data && typeof data === 'object') {
      // Check for common wrapper properties
      if (Array.isArray(data.categories)) {
        return data.categories;
      }
      if (Array.isArray(data.data)) {
        return data.data;
      }
      // If object has array values, return the first array found
      const values = Object.values(data);
      const arrayValue = values.find(v => Array.isArray(v)) as (CategoryObject | string)[] | undefined;
      if (arrayValue) {
        return arrayValue;
      }
    }
    
    // If we can't parse it, return empty array
    console.error('Unexpected categories API response format:', data);
    return [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (category: string, limit: number = 30): Promise<ProductsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};



