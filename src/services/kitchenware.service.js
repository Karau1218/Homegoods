import db from "../db.js";

// handle optional filtering and searching
export async function getAllProducts(category = 'All', search = '') {
    try {
        let query = "SELECT * FROM products WHERE 1=1";
        let params = [];

        if (category && category !== 'All') {
            query += " AND category = ?";
            params.push(category);
        }

        if (search) {
            query += " AND (productName LIKE ? OR productDescription LIKE ?)";
            params.push(`%${search}%`, `%${search}%`);
        }

        const [rows] = await db.query(query, params);
        return rows;
    } catch (err) {
        console.error("Service Error:", err);
        throw err;
    }
}

export async function getProductById(id) {
    const [rows] = await db.query(
        "SELECT * FROM products WHERE productId = ?",
        [id]
    );
    return rows[0];
}