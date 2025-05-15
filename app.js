import dotenv from "dotenv";
import express from "express";

import configApp from "./config/index.js";
import indexRoutes from "./routes/index.routes.js";
import errorHandling from "./error-handling/index.js";

dotenv.config();

const app = express();

configApp(app);

app.use("/api", indexRoutes);

errorHandling(app);

export default app;
