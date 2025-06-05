# E-Commerce Sales Chatbot

An interactive chatbot for an e-commerce platform that helps customers search, explore, and purchase products.

## Project Overview

- **Tech Stack**: HTML5, CSS3, JavaScript, Node.js, Express.js, MongoDB

## Project Structure

```
ecommerce-chatbot/
├── frontend/
│   ├── index.html          # Main HTML file for the chatbot interface
│   ├── css/
│   │   └── style.css       # Styling for the chatbot interface
│   ├── js/
│   │   └── chatbot.js      # Frontend JavaScript for chatbot functionality
│   └── assets/
│       └── images/         # Storage for UI elements
├── backend/
│   ├── server.js           # Express server setup
│   ├── routes/
│   │   └── api.js          # API endpoints for chatbot and products
│   ├── models/
│   │   └── Product.js      # MongoDB schema for products
│   ├── data/
│   │   ├── products.json   # Mock product data
│   │   └── seed.js         # Database seeding script
│   └── config/
│       └── database.js     # Database configuration
├── docs/
│   └── technical_documentation.md  # Technical documentation
└── package.json            # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Seed the database with mock product data:

```
npm run seed
```

4. Start the server:

```
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## Features

- Interactive chat interface
- Product search and recommendations
- Responsive design for all devices
- Real-time chat interaction
- Mock e-commerce inventory with detailed product information

## API Endpoints

- **GET /api/test**: Test endpoint to verify API is working
- **POST /api/chat**: Send messages to the chatbot and get responses
- **GET /api/products**: Get all products
- **GET /api/products/search/:query**: Search products by name, description, category, or brand
- **GET /api/products/:id**: Get a specific product by ID
- **GET /api/categories**: Get all unique product categories
- **GET /api/categories/:category**: Get all products in a specific category

## Implementation Notes

- Simple MongoDB connection without environment variables
- Basic product searching and filtering
- Straightforward product schema focused on essential fields
- Easy-to-understand API routes without complex parameters

## Mock Data

The system comes with a complete mock inventory including:

- Smartphones
- Laptops
- Tablets
- Audio devices
- TVs
- Gaming consoles
- Accessories

This data can be easily modified or extended in the `backend/data/products.json` file.
