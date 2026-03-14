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
  "http://localhost:3000",                  // local dev
  "https://talentprobe-peach.vercel.app/",       // your deployed frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,                        // needed if using cookies/sessions
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
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
