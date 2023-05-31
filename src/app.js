import express, { urlencoded }  from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", handlebars.engine()); 
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const server = app.listen(8080, () => {
    console.log("Server listening on port 8080");
});

const io = new Server(server);
const newProducts = [];
const id = 0;

io.on("connection", (socket) => {
    console.log("New connection");
    socket.on("disconnect", () => {
    console.log("Client disconnected");
    });
//     socket.on("message", (message) => {
//         console.log(message);
//     });
//     socket.emit("message", "Hello from server");
//     socket.broadcast.emit("message_all_clients", "A new user has joined the chat");
//     io.emit("message_all", "message to all clients");
});