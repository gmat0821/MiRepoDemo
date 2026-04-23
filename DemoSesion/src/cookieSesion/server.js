import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import auth from "./src/CookieHttpOnly/auth.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const SECRET = "supersecreto";
app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "12345") {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 5000
        });
        return res.json({ message: "Login exitoso" });
    }
    return res.status(401).json({ message: "Credenciales inválidas" });
});

app.get("/perfil", auth, (req, res) => {
    res.json({
        message: "Eres usuario protegido",
        user: req.user.username
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout exitoso" });
});

app.listen(5173, () => {
    console.log("Servidor corriendo en http://localhost:5173");
});

    

