import { Router } from "express"
import db from "../db.js"; // the DB connection

const router = Router()

router.get("/", (req, res) => {
    res.render("page")

})

router.get("/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.render("products", { products: rows }); 
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    
    const [rows] = await db.query("SELECT * FROM products WHERE productId = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    const product = rows[0];

    res.render("product-detail", { product: product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;