const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");

// Initialize app
const app = express();

// Port configuration
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Basic test route
app.get("/api/test", (req, res) => {
	res.json({ message: "API is working!" });
});

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// Catch-all route to serve the frontend
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
const startServer = async () => {
	try {
		// Connect to MongoDB
		await connectDB();

		// Start listening
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};

// Start the server
startServer();
