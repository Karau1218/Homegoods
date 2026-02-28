import { getAllProducts, getProductById } from "../services/kitchenware.service.js";

export function showHome(req, res) {
    return res.render("page");
}

export async function showProducts(req, res) {
  try {
    const products = await getAllProducts();
    return res.render("products", { products });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Database error");
  }
}

export async function showProductDetail(req, res) {
  try {
    const product = await getProductById(req.params.id);

    if (!product)
      return res.status(404).send("Product not found");

    return res.render("product-detail", { product });

  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
}