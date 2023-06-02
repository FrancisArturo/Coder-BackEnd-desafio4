import express, { urlencoded }  from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./Manager.js";

const manager = new ProductManager();
const app = express();
const server = app.listen(8080, () => {
    console.log("Server listening on port 8080");
});
const io = new Server(server);

app.use(express.static(__dirname + "/public"));
app.use(urlencoded({extended: true}));
app.use(express.json());
app.use("/", viewsRouter);


app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.set("socketio", io);    



io.on("connection", (socket) => {
    console.log("New connection");
    socket.on("disconnect", () => {
    console.log("Client disconnected");
    });
    socket.on("addProduct", async (data) => {
        const newProduct = await manager.addProduct(data.title, data.description, data.code, data.price, data.status, data.stock, data.category, data.thumbnail);
        if (newProduct === "El código ya existe") {
            console.log("El código ya existe");
            socket.emit("newProduct", {error: "El código ya existe"});
        }
        else if (newProduct === "Faltan datos") {
            console.log("Faltan datos");
            socket.emit("newProduct", {error: "Faltan datos"});
        }
        else {
            const products = await manager.getProducts();
            console.log(products);
            io.sockets.emit("newProduct", data);
        }
    });
});