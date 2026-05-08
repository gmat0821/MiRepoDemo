const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // URL por defecto de Vite
    methods: ["GET", "POST"]
  }
});

// Nuestra "Base de Datos" temporal
const messages = [];

io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // 1. Enviar mensajes históricos al usuario que se acaba de conectar
  socket.emit('chat_history', messages);

  // 2. Escuchar cuando alguien envía un mensaje
  socket.on('send_message', (data) => {
    // data = { user: "Pepito", text: "Hola!" }
    messages.push(data); 
    
    // 3. Reenviar el mensaje a TODOS los conectados
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});