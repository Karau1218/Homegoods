import db from "../db.js";

export async function getAllProducts() {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
}

export async function getProductById(id) {
    const [rows] = await db.query(
        "SELECT * FROM products WHERE productId = ?",
        [id]
    );
    return rows[0];
}