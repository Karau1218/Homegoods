import app from './app.js';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import chalk from 'chalk';

dotenv.config({
    path: "./.env"
}); // load .env variables

// destructure our env values
const {
    PORT,
    DB_DATABASE,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD
} = process.env;

//connect to db 
try {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE
    });

    console.log(chalk.blue(`Connected to database on ${DB_HOST}:${DB_PORT}`));

    app.get("/products", async (req, res) => {
        //perform query
        const [ products ] = await connection.query(
            'SELECT productName, productDescription, price FROM products');

        res.status(200).json({
            message: `Found ${products.length} records`,
            products: products
        })
    });

} catch (err) {
    console.log(chalk.red("Something went wrong:"), err.message);
    console.error(err.stack);
}

// Start server
const port = process.env.PORT || 8002;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
