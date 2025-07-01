const express = require('express');  //common js model
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());
dbConnect();

dotenv.config();

const port = process.env.PORT;
console.log(port);

app.get('/system', (req, res) => {
  res.send('Hello This is ------> Apna System')
})

// Ensure the uploads directory exists
const ensureUploadsDirectoryExists = () => {
  const dir = path.join(__dirname, "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Call this to create the directory if it doesn't exist
ensureUploadsDirectoryExists();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDirectoryExists(); // Ensure the directory exists before saving the file
    cb(null, path.join(__dirname, "uploads")); // Use absolute path
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});


app.use("/api/auth", require("./routes/Auth"));
app.use("/api/product", upload.array("image"), require("./routes/Products"));
app.use("/api/cart", require("./routes/Carts"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
