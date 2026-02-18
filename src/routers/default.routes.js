import { Router } from "express"
import db from "../db.js"; // the DB connection

const router = Router()

router.get("/", (req, res) => {
    res.render("page")

})

router.get("/products", async (req, res) => {
  try {
    // Fetch all products from the SQL table
    const [rows] = await db.query("SELECT * FROM products");
    res.render("products", { products: rows }); // pass data to EJS
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});





export default router