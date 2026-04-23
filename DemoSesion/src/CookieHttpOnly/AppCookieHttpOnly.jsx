import { useState } from "react";

export default function AppCookieHttpOnly() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("12345");
    const [message, setMessage] = useState("");

    const login = async() => {
        const res=await fetch("http://localhost:5173/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Importante para enviar cookies
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
         SetMessage(data.message);
    };
    const obtenerPerfil = async() => {
        const res=await fetch("http://localhost:5173/profile", {
            method: "GET",
            credentials: "include" // Importante para enviar cookies
        });
        const data = await res.json();
         SetMessage(data.message);
    };
    
    const logout = async() => {
        const res=await fetch("http://localhost:5173/logout", {
            method: "POST",
            credentials: "include" // Importante para enviar cookies
        });
        const data = await res.json();
            SetMessage(data.message);
    };
    return (
        <div>
            <h1>Autenticacion con Cookie segura</h1>
            <input

                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />

             <input

                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
            />

            <button onClick={login}>Login</button>
            <button onClick={obtenerPerfil}> Perfil</button>
            <button onClick={logout}>Logout</button>

            <div>
                <strong>Respuesta:</strong>
                <p>{message}</p>
            </div>

        </div>

    );


}