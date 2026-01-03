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



## Assumptions & Design Decisions

### 1. Data Loading & Pagination
- **Assumption**: Initial load shows minimum 20 products as required, with pagination for additional products
- **Decision**: Implemented "Load More" button instead of infinite scroll for better control and performance
- **Reasoning**: Load More provides explicit user control and prevents overwhelming mobile devices with excessive data

### 2. Search Functionality
- **Assumption**: Search is performed on product names/titles as specified
- **Decision**: Implemented debounced search (300ms) to balance responsiveness and API efficiency
- **Reasoning**: Debouncing prevents API spam while maintaining a responsive feel

### 3. Category Overview
- **Assumption**: Categories should be displayed visually with product images rather than plain text
- **Decision**: Fetch one sample product per category to use as category thumbnail
- **Reasoning**: Visual representation is more intuitive and engaging for users

### 4. Similar Products
- **Assumption**: Similar products are defined as products from the same category
- **Decision**: Display up to 5 similar products (excluding current product) to avoid overcrowding
- **Reasoning**: Limited number maintains focus while providing useful recommendations

### 5. Stock Status Display
- **Assumption**: Stock status should be clearly visible with both text and color coding
- **Decision**: Green background for in-stock, red for out-of-stock, with stock count
- **Reasoning**: Color coding provides instant visual feedback, which is critical for inventory management

### 6. Sorting Options
- **Assumption**: Users need to sort by price (high-value items) and name
- **Decision**: Implemented sorting by name (alphabetical) and price (low to high)
- **Reasoning**: Alphabetical sorting helps with browsing, while price sorting helps identify valuable inventory

### 7. Filtering
- **Assumption**: Category filtering should be available on the main inventory view
- **Decision**: Category filter is hidden when viewing a specific category (to avoid confusion)
- **Reasoning**: When already filtered by category, additional category filter is redundant

### 8. Error Handling
- **Assumption**: Network errors and API failures should be handled gracefully
- **Decision**: Display user-friendly error messages with retry functionality
- **Reasoning**: Prevents blank screens and helps users understand what went wrong

### 9. Design System
- **Assumption**: Consistent color palette and spacing throughout the application
- **Decision**: Used a cohesive color scheme (blues, grays, greens, reds) with consistent spacing units
- **Reasoning**: Professional, cohesive appearance improves user trust and usability

### 10. Mobile Responsiveness
- **Assumption**: Application must work on desktop (1080p), tablet (iPad), and mobile devices
- **Decision**: Responsive breakpoints and flexible grid layouts
- **Reasoning**: Store managers need access on various devices for real-world usage scenarios

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
