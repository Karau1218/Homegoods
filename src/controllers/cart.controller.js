import { getProductById } from "../services/kitchenware.service.js";

/* Helper function to attach product details to cart items */
const buildDetailedCart = async (cart) => {
  const detailedItems = await Promise.all(
    cart.map(async (item) => {
      const product = await getProductById(item.productId);

      if (!product) return null;

      return {
        productId: item.productId,
        name: product.productName,
        price: product.price,
        image: product.imageUrl,
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      };
    })
  );

  return detailedItems.filter(item => item !== null);
};


/* Get Cart */
export const getCart = async (req, res) => {

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const detailedItems = await buildDetailedCart(req.session.cart);

  res.json({ items: detailedItems });
};


/* Add Item to Cart */
export const addCartItem = async (req, res) => {

  const { productId } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existing = req.session.cart.find(
    item => Number(item.productId) === Number(productId)
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    req.session.cart.push({
      productId: Number(productId),
      quantity: 1
    });
  }

  const detailedItems = await buildDetailedCart(req.session.cart);

  res.json({ items: detailedItems });
};


/* Remove Item Completely */
export const removeCartItem = async (req, res) => {

  const productId = Number(req.params.productId);

  if (!req.session.cart) {
    req.session.cart = [];
  }

  req.session.cart = req.session.cart.filter(
    item => Number(item.productId) !== productId
  );

  const detailedItems = await buildDetailedCart(req.session.cart);

  res.json({ items: detailedItems });
};


/* Decrease Item Quantity */
export const decreaseCartItem = async (req, res) => {

  const productId = Number(req.params.productId);

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(
    item => Number(item.productId) === productId
  );

  if (!existingItem) {
    const detailedItems = await buildDetailedCart(req.session.cart);
    return res.json({ items: detailedItems });
  }

  existingItem.quantity -= 1;

  if (existingItem.quantity <= 0) {
    req.session.cart = req.session.cart.filter(
      item => Number(item.productId) !== productId
    );
  }

  const detailedItems = await buildDetailedCart(req.session.cart);

  res.json({ items: detailedItems });
};


/* Clear Entire Cart */
export const clearCart = async (req, res) => {

  req.session.cart = [];

  res.json({ items: [] });
};