import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import boulderRoutes from "./routes/boulder.routes.js";
import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/boulders", boulderRoutes);
app.use("/api/user", userRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "OK" });
});

const PORT = Number(process.env.PORT ?? 6000);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
