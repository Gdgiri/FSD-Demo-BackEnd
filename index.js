import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoDB } from "./Database/config.js";
import authRoute from "./Routers/authRouters.js";

dotenv.config();

//Middleware
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// error handler

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//DB connectivity
MongoDB();

// access the .env
const port = process.env.PORT || 4000;
const message = process.env.MESSAGE || "Hello, World!";

//default routes

app.get("/", (req, res) => {
  res.status(200).send(message);
});

//API Routes

app.use("/api/auth",authRoute)

// Listen
app.listen(port, () => {
  console.log(`Server is running`);
});
