/**
 * Server entrypoint
 * Sets up the Express application, middleware, and API routes.
 * Starts the HTTP server and initializes the database connection.
 */
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",                  // local dev
  "https://talentprobe-peach.vercel.app",       // your deployed frontend URL
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  //  add OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
};

//  cors and preflight must be BEFORE all routes and body parsers
app.use(cors(corsOptions));

//  manual preflight handler instead of app.options("*", cors())
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDb();
});
