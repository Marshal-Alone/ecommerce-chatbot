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
│   │   └── products.json   # Mock product data
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

3. Start the server:

```
node backend/server.js
```

4. Open your browser and navigate to `http://localhost:3000`

## Features

- Interactive chat interface
- Product search and recommendations
- Responsive design for all devices
- Real-time chat interaction

## API Endpoints

- **GET /api/test**: Test endpoint to verify API is working
- **POST /api/chat**: Send messages to the chatbot and get responses



