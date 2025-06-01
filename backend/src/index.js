import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import verifyRoutes from "./routes/verify.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", verifyRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Donation backend is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
