/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { athleteRoutes } from "./routes/athletes";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use("/athletes", athleteRoutes);
app.get("/", (req, res) => {
  res.json({ name: "node-api-ts", status: 200 });
});
