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

router.post('/realtimeproducts', async (req, res) => {
    const { title, description, code, price, status, stock, category,  thumbnail} = req.body;
    const newProduct = await manager.addProduct(title, description, code, price, status, stock, category,  thumbnail);
    if (newProduct === "El código ya existe") {
        res.status(400).json({error: "El código ya existe"});
    } else if (newProduct === "Faltan datos") {
        res.status(400).json({error: "Faltan datos"});
    } else {
        res.render("realTimeProducts", {products: await manager.getProducts()});
    }
    });
export default router;