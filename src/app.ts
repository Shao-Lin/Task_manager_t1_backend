import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// ───── global middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }));
app.use(json({ limit: "1mb" }));
app.use(morgan("dev"));

// ───── routes
app.use("/api/tasks", taskRoutes);

// fallback 404 for unknown routes

// ───── error handler (always last)
app.use(errorHandler);

export default app;
