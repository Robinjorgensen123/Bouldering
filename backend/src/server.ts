import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "OK" });
});

const PORT = Number(process.env.PORT ?? 6000);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
