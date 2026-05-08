const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const Redis = require('ioredis');
const cookieParser = require('cookie-parser');
//Comando para instalar las dependencias 
// npm install express socket.io cors ioredis cookie-parser nodemon

const app = express();

// --- CONFIGURACIÓN DE COOKIES ---
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.8.239:5173"], // Cambia la IP por la tuya
  credentials: true 
}));

// Endpoint para "loguearse" y setear la cookie
app.get('/login/:username', (req, res) => {
  const { username } = req.params;
  res.cookie('user_chat', username, { 
    httpOnly: true, 
    secure: false, // true solo si usas HTTPS
    sameSite: 'lax' 
  });
  res.send(`Usuario ${username} guardado en cookie`);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: true, credentials: true }
});

const REDIS_URL = "rediss://:gQAAAAAAAcL6AAIgcDI2NmQ2NTk3NGIxOGE0YmI5YTQ4NTAzYTZjMGJmNzA5NQ@nearby-ram-115450.upstash.io:6379";
const pub = new Redis(REDIS_URL);
const sub = new Redis(REDIS_URL);

// Suscribirse al canal de chat global
sub.subscribe('CHAT_CHANNEL');

sub.on('message', (channel, message) => {
  if (channel === 'CHAT_CHANNEL') {
    const data = JSON.parse(message);
    // Cuando Redis avisa, este servidor le avisa a SUS usuarios conectados
    io.emit('receive_message', data);
  }
});

io.on('connection', (socket) => {
  // Nota: Para leer la cookie aquí, Socket.io requiere un pequeño middleware, 
  // pero por simplicidad escolar, la seguiremos enviando en el login.
  
  socket.on('send_message', (data) => {
    // En lugar de hacer io.emit directamente, publicamos en Redis
    pub.publish('CHAT_CHANNEL', JSON.stringify(data));
  });
});

server.listen(3001, '0.0.0.0', () => { // 0.0.0.0 para que sea visible en la red local
  console.log('Servidor multienlace activo en puerto 3001');
});