import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js";

dotenv.config();
connectDB();

const app = express();

// Allow frontend to call backend
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//       "http://localhost:5175",
//       "http://localhost:5176",
//       "https://task-manager-full-stack12.vercel.app"
//     ],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: (origin, cb) => {
      // allow Postman / server-to-server
      if (!origin) return cb(null, true);

      // allow localhost
      if (origin.startsWith("http://localhost:")) return cb(null, true);

      // ✅ allow all vercel deployments of this project
      if (origin.includes(".vercel.app")) return cb(null, true);

      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Task Manager Backend Running");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running: http://localhost:${PORT}`);
});

