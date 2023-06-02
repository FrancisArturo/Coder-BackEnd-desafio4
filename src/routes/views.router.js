import { Router } from "express";
import ProductManager from "../Manager.js";

const router = Router();
const manager = new ProductManager();


router.get("/", async (req, res) => {
    const products = await manager.getProducts();
    const {limit} = req.query;
    if (limit) {
        res.render("home", {products: products.slice(0, limit)}); 
    } else {
        res.render("home", {products});
    }
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await manager.getProducts();
    const {limit} = req.query;
    if (limit) {
        res.render("realTimeProducts", {products: products.slice(0, limit)}); 
    } else {
        res.render("realTimeProducts", {products});
    }
});

export default router;