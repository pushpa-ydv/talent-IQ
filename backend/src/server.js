import express from "express";
import cors from "cors";
import {serve} from "inngest/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest } from "./lib/inngest.js";

const app = express();

app.use(express.json());

//crediantials: true allows the server to accept cookies from the client, which is necessary for authentication and session management. 
app.use(cors({origin: ENV.CLIENT_URL, credentials: true }));

app.use("api/inngest", serve({client: inngest, functions}));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}.`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();