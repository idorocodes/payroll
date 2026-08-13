import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { db } from "./config/db.js";
import { sql } from "drizzle-orm";

const PORT = Number(process.env.PORT) || 5000;

async function start() {
  try {
    const result = await db.execute(sql`SELECT 1`);
    console.log("Database connected via Drizzle!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

start();