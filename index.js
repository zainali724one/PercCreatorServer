const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const uploadFileRoutes = require("./routes/uploadFileRoutes");
const generateReplicateRoutes = require("./routes/generateReplicateRoutes");

const app = express();
const PORT = 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5501",
  "https://letsgomanga.com",
  "http://127.0.0.1:5501",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// app.options("*", cors());

// Middleware
app.use(bodyParser.json());

// Routes

app.use(`/api`, uploadFileRoutes);

app.use(`/api`, generateReplicateRoutes);

app.get("/", (req, res) => res.send("api is running!"));

// Health Check

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
