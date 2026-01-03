# Inventory Management Dashboard

A modern, responsive web-based inventory management system built with React. This application provides store managers with a comprehensive interface to browse, search, filter, and analyze product inventory across desktop and mobile devices.

## Features

### 1. Welcome Home Page
- **Modern Landing Experience**: Attractive hero section with gradient backgrounds and compelling messaging
- **Feature Showcase**: Interactive cards highlighting key application capabilities (Inventory Analytics, Category Management)
- **Enterprise Features Grid**: Comprehensive overview of advanced features including AI-powered search, responsive design, performance optimizations, analytics, recommendations, and stock intelligence
- **Quick Navigation**: Direct access buttons to main application sections

### 2. Inventory Overview Screen
- **Comprehensive Product List**: View all products with key information (Name, Price, Brand, Category, Stock Status, Rating)
- **Advanced Filtering**: Filter products by category
- **Flexible Sorting**: Sort products by name (A-Z) or price (low to high)
- **Real-time Search**: Search products by name with debounced input (300ms delay)
- **Pagination**: Load more products on demand (initial load of 20+ products)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 3. Product Details Screen
- **Detailed Product Information**: Complete product details including description, rating, discount percentage
- **Visual Product Gallery**: Main product image with thumbnail gallery
- **Stock Status**: Clear indication of stock availability
- **Related Products**: Browse similar products from the same category (up to 5 products displayed)

### 4. Category Overview Screen
- **Category Grid View**: Visual representation of all product categories with sample images
- **Drill-Down Navigation**: Click on any category to view all products in that category
- **Reusable Interface**: Category product view uses the same Inventory Overview interface for consistency

## Technology Stack

- **React 19.2.3**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **DummyJSON API**: Backend API for product data
- **Create React App**: Build tooling and development environment

## API Endpoints Used

The application uses the following endpoints from [DummyJSON API](https://dummyjson.com/docs/products):

- `GET /products` - Fetch all products with pagination
- `GET /products/:id` - Get single product details
- `GET /products/search?q=query` - Search products
- `GET /products/categories` - Get all categories
- `GET /products/category/:category` - Get products by category

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd inventory
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   The application will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
inventory/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/          # Reusable components
│   │   ├── ErrorDisplay.tsx # Error display component
│   │   ├── Loading.tsx      # Loading spinner component
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── ProductCard.tsx  # Product card component
│   ├── pages/              # Page components
│   │   ├── Home.tsx         # Welcome/home page
│   │   ├── InventoryOverview.tsx  # Main inventory list
│   │   ├── ProductDetails.tsx     # Product detail page
│   │   └── CategoryOverview.tsx   # Category browser
│   ├── services/           # API service layer
│   │   └── api.ts          # API functions
│   ├── App.tsx             # Main app component with routing
│   ├── App.test.tsx        # App component tests
│   ├── index.tsx           # Entry point
│   ├── index.css           # Global styles
│   ├── reportWebVitals.ts  # Web vitals reporting
│   └── setupTests.ts       # Test setup configuration
├── package.json
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── README.md
```

## Key Features & Implementation Details

### Performance Optimizations
- **Debounced Search**: 300ms delay to prevent excessive API calls
- **Lazy Loading**: Images load lazily to improve initial page load
- **Progressive Loading**: Initial load of 20 products, with "Load More" functionality
- **Memoization**: useMemo hook for filtered and sorted products

### Responsive Design
- Mobile-first approach with breakpoints at 480px, 768px, and 968px
- Flexible grid layouts that adapt to screen size

### User Experience
- Clear loading states with spinner animations
- Comprehensive error handling with retry options
- Intuitive navigation with active route highlighting



## Browser Compatibility

The application is tested and works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is created as an assignment/demo project.

## Contact & Support

For questions or issues, please refer to the project documentation or API documentation at [DummyJSON Docs](https://dummyjson.com/docs/products).
