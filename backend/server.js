import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { notFund, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready!");
});

app.use(notFund);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

// - **POST** /api/users** - Register a user
// - **POST** /api/users/auth** - Authrenticate a user and get a token
// - **POST** /api/logout** - Logout userand clear cookie
// - **GET** /api/users/profile** - Get user profile
// - **GET** /api/users/profile** - Update user profile
