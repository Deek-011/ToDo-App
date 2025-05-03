const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// const path = require("path"); // If you plan to serve static files later, keep this

require("dotenv").config();

const app = express();

// CORS configuration to allow requests only from your frontend (e.g., Vercel URL)
const allowedOrigins = ['https://to-do-app-client-rho.vercel.app'];  // Replace with your actual Vercel URL or localhost for development

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);  // Allow the request if it comes from the allowed origin or no origin (for local dev)
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Middleware
app.use(cors(corsOptions));  // Using the custom CORS middleware
app.use(bodyParser.json());

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server after successful DB connection
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Routes for /todos
const todoRoutes = require("./routes/todos");
app.use("/todos", todoRoutes);

// Serve frontend build for deployment (if you are serving static files later)
// Uncomment these lines if you're serving a React build from the backend
// app.use(express.static(path.join(__dirname, "../frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

// Handle 404 errors (if route is not found)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});
