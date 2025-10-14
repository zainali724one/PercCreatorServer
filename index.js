const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const uploadFileRoutes = require("./routes/uploadFileRoutes");

const app = express();
const PORT = 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5501",
  "https://letsgomanga.com",
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
// CLIENT_ID=832861452898-icpkrq7gi151jhb4h1ktqo26jqq214ql.apps.googleusercontent.com  testing only
// CLIENT_SECRET=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

app.get("/", (req, res) => res.send("api is running!"));

// Health Check

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
