// Import Modules
const express = require("express");
const app = express();
const dotenv = require("dotenv");

// Routes Files
const auth = require("./routes/auth");
const product = require("./routes/product");
const productCategory = require("./routes/productCategory");
const cart = require("./routes/cart");

// Import connectDB
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

// Connect Database
connectDB();

// Body Parser
app.use(express.json());

// Mount Routes
app.use("/api/v0/auth", auth);
app.use("/api/v0/products", product);
app.use("/api/v0/productCategory", productCategory);
app.use("/api/v0/cart", cart);

// intialize the port
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`);
});
