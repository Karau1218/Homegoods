# Simply Kitchen and Dining

#### Sustainable Kitchenware and Dining Retailer
Web Frameworks Capstone Project

Team Members: 
- Azeb Tesfay - Github: `azeb-s`
- Ebtisam Abdelkerim - Github: `ebtisam0402`
- Fredrick Karau - Github: `Karau1218`
- Lilian Nguyen - Github: `liliann19`

---

## Project Overview
Simply Kitchen and Dining is a professional ecommerce web application focused on sustainable, high-quality kitchenware and dining products for everyday cooking, eating, and hosting. The application is designed to reflect a realistic online storefront that prioritizes environmentally responsible materials and thoughtful design.

The purpose of this project is to demonstrate full-stack web application architecture using:

- Server-Side Rendering (SSR)
- Express.js
- MVC architecture
- MySQL database integration
- REST-style API endpoints
- Secure session-based state management

This project serves as a portfolio-ready example of structure, maintainable web application development. 

---

## Product Category
- Sustainable kitchenware and dining essentials

Examples include cooking utensils, food storage solutions, tableware, and hosting accessories made from eco-friendly materials.

---

## Technology Stack
- Node.js
- Express.js
- MySQL
- MVC architecture 
##### Frontend
- EJS templating
- CSS (Flexbox/Grid)
##### Tools
- Git & GitHub for version control
- Nodemon
- Docker (MySQL container)

---

## Setup Instructions
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate into the project directory:
    ```bash
    cd Simply-Kitchen-and-Dining
    ```
3. Install project dependencies:
    ```bash 
    npm install 
    ```
4. Create a `.env` file in the root directory:
    ```
    PORT=8002
    DB_DATABASE=simplykitchen
    DB_HOST=localhost
    DB_PORT=3307
    DB_USER=[user]
    DB_PASSWORD=[password]
    ```
5. Set up the database
    - Create a MySQL database
    - Run the SQL scripts located in the `/scripts` directory in this order:
        - `schema.sql`
        - `seed.sql`
6. Start development server:
    ```bash
    npm run dev
    ```
7. Open the application in your browser:
    ```bash
    http://localhost:8002
    ```

---

## Application Routes

| Route | Description |
|------|-------------|
| `/` | Home page |
| `/products` | Displays the full product catalog |
| `/products/:id` | Displays the detail page for a single product |

## API Endpoints

| Endpoint | Description |
|---------|-------------|
| `/api/products` | Returns product data as JSON |

## Public Pages 
- `/`
- `/register`
- `/login`

## Protected Pages
- `/products`
- `/products/:id`
- `/cart`
- All `/api/*` endpoints related to cart behavior

---

## Cart API
```
GET /api/cart
POST /api/cart/items
PATCH /api/cart/items/:productId/decrease
DELETE /api/cart/items/:productId
DELETE /api/cart 
````
All cart endpoints require authentication.

---

## Session-Based Cart Model
The cart is stored in `req.session.cart` (configured in `app.js` using express-session and managed in `cart.controller.js`). 

Each item stores: 
- `productId`
- `quantity`

Product details (name, price, image) are fetched dynamically when `/api/cart` is called. 

--- 

## Authentication 
- Users can register and log in 
- On login, `req.session.userId` is stored
- Protected routes require authentication
- Unauthorized API requests return `401`
- Users can log out via `/logout`, which destroys the session