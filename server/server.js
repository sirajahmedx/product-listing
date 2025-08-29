import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { products } from "./data/products.js";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.get("/api/products", (req, res) => {
  const { category, minRating, search, sortBy, sortOrder } = req.query;

  let filteredProducts = [...products];

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minRating) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= parseFloat(minRating)
    );
  }

  if (search) {
    const searchTerm = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  }

  if (sortBy) {
    filteredProducts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "name") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "desc") {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });
  }

  res.json(filteredProducts);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

app.get("/api/categories", (req, res) => {
  const categories = [...new Set(products.map((product) => product.category))];
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
