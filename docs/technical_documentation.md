# E-Commerce Chatbot Technical Documentation

## 1. Architecture Overview

### 1.1 System Architecture

The e-commerce chatbot is built on a client-server architecture:

- **Frontend**: A web-based chatbot interface built with HTML5, CSS3, and JavaScript
- **Backend**: A Node.js server with Express.js framework
- **Database**: MongoDB for storing product data
- **API**: RESTful API to facilitate communication between the frontend and backend

### 1.2 Data Flow

1. User sends a message through the chatbot interface
2. Frontend JavaScript captures the message and sends it to the backend API
3. Backend processes the message and retrieves product information
4. Backend formats the response and sends it back to the frontend
5. Frontend displays the response to the user

## 2. Technology Choices

### 2.1 Selected Technologies

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

The technology stack was chosen based on:

- JavaScript across the entire stack for consistent development
- Strong ecosystem of packages and community support
- Flexibility and speed in development
- Suitability for building interactive web applications

### 2.2 Simplified Approach

This implementation follows a simplified approach:

- Direct hardcoded MongoDB connection (no environment variables)
- JavaScript-based filtering for search operations
- Focused product schema with essential fields only
- Simple response logic for the chatbot
- Straightforward API endpoints without complex parameters

## 3. Implementation Details

### 3.1 Frontend Implementation

#### 3.1.1 HTML Structure (`frontend/index.html`)

- Responsive HTML5 structure with appropriate meta tags
- Chatbot interface with message area and input controls
- Font Awesome icons for improved visual appeal
- Initial welcome message to guide the user

#### 3.1.2 CSS Styling (`frontend/css/style.css`)

- CSS variables system for consistent theming
- Responsive design with mobile-first approach
- Message bubble styling with sender differentiation
- Loading animation and typing indicators
- Product card styling for displaying product information

#### 3.1.3 JavaScript Functionality (`frontend/js/chatbot.js`)

- DOM manipulation for dynamic message rendering
- Event listeners for user interactions
- API communication using fetch and async/await
- Chat history tracking for context preservation
- Error handling for network issues

### 3.2 Backend Implementation

#### 3.2.1 Express Server (`backend/server.js`)

- Express application setup with middleware configuration
- CORS support for cross-origin requests
- Static file serving for frontend assets
- Direct database connection without environment variables

#### 3.2.2 Database Configuration (`backend/config/database.js`)

- Simplified MongoDB connection with mongoose
- Hardcoded connection string for ease of deployment
- Basic error handling for connection issues

#### 3.2.3 API Routes (`backend/routes/api.js`)

- Simple API endpoints for chatbot and product functionality
- Basic product search using JavaScript filter methods
- Category-based filtering for product discovery
- Minimal sorting capabilities (by name or price)

#### 3.2.4 Product Model (`backend/models/Product.js`)

- Streamlined schema definition
- Essential fields with minimal validation
- Straightforward structure for ease of understanding

#### 3.2.5 Data Seeding (`backend/data/seed.js`)

- Script to populate the database with mock product data
- Clear existing data before seeding
- Direct MongoDB connection for simplicity

### 3.3 Mock Product Data (`backend/data/products.json`)

- Structured JSON data representing various product categories
- Essential product information including:
  - Name, category, price, description, brand
  - Specifications as a simple object
  - Features as an array of strings
  - Rating and stock information

## 4. API Endpoints

### 4.1 Products API

- **GET /api/products**: Retrieves all products

  - Optional query parameters:
    - `sort`: Sort by "name" or "price" (default: "name")
    - `order`: "asc" or "desc" for sorting direction (default: "asc")

- **GET /api/products/search**: Search products

  - Query parameters:
    - `q`: Search term (optional)
    - `category`: Filter by category (optional)

- **GET /api/products/category/:category**: Get products by category

  - URL parameter:
    - `category`: Category name (e.g., "smartphones")

- **GET /api/products/:id**: Get single product by ID
  - URL parameter:
    - `id`: MongoDB ID of the product

### 4.2 Categories API

- **GET /api/categories**: Get all unique product categories

### 4.3 Chatbot API

- **POST /api/chat**: Send message to chatbot
  - Request body:
    - `message`: User's message text

## 5. Design Decisions

### 5.1 UI Design

- Clean, focused chatbot interface
- Blue color scheme to convey trust and professionalism
- Conversation-centric experience
- Mobile-first responsive design
- Product cards for displaying search results

### 5.2 Code Structure

- Separation of concerns between frontend and backend
- Simplified API implementations for clarity
- Direct, hardcoded connections for ease of setup
- Standard JavaScript filtering methods instead of complex database queries

### 5.3 Data Structure

- Focused product schema with essential fields
- Specifications stored as a simple object for flexibility
- Features as a simple array of strings
- Sample products spanning various electronics categories

## 6. Getting Started

To run the project locally:

1. Install dependencies: `npm install`
2. Ensure MongoDB is running on localhost:27017
3. Seed the database: `npm run seed`
4. Start the server: `npm run dev`
5. Access the application at http://localhost:8080
