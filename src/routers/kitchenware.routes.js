import { Router } from "express";
import { showHome, showProducts, showProductDetail, getApiProducts } from "../controllers/kitchenware.controller.js";

const router = Router();

router.get("/", showHome);
router.get("/products", showProducts);
router.get("/api/products", getApiProducts);
router.get("/products/:id", showProductDetail);

export default router;