const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
dotenv.config(); // Load environment variables first

// ✅ Correct CORS setup
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://primeshoe-nepal.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));




app.use(express.json()); // Parse incoming JSON

dbConnect(); // Connect to DB

const port = process.env.PORT || 5000; // fallback if PORT undefined
console.log("Server running on port:", port);

// --- Health Check Route
app.get('/system', (req, res) => {
  res.send('Hello This is ------> Apna System');
});

// --- Ensure uploads directory exists
const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
ensureUploadsDirectoryExists();

// --- Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirectoryExists();
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

// --- Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

// --- Routes
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/product", upload.array("image"), require("./routes/Products"));
// app.use("/api/cart", require("./routes/Carts"));

// --- Start server
app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
});
