import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
//Comando para instalar las dependencias
// npm install socket.io-client

// IMPORTANTE: Cambia 'localhost' por TU_IP_LOCAL para que tu pareja se conecte
const SERVER_URL = 'http://localhost:3001'; 
const socket = io(SERVER_URL, { withCredentials: true });

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on('chat_history', (history) => {
      setChat(history);
    });

    return () => {
      socket.off('receive_message');
      socket.off('chat_history');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      // Intentamos setear la cookie httpOnly en el backend
      const response = await fetch(`${SERVER_URL}/login/${username}`, {
        method: 'GET',
        credentials: 'include', // Permite recibir y guardar la cookie
      });

      if (response.ok) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('send_message', { user: username, text: message });
      setMessage('');
    }
  };

  // --- VISTA DE LOGIN ---
  if (!isLoggedIn) {
    return (
      <div className="chat-container login-wrapper">
        <div className="chat-header">
          <h3>Entrar al DevChat</h3>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Escribe tu nombre..." 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Empezar a chatear</button>
        </form>
      </div>
    );
  }

  // --- VISTA DE CHAT ---
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>🚀 DevChat - Fase 2 (Redis)</h3>
        <small>Identificado como: <strong>{username}</strong></small>
      </div>

      <div className="messages-list">
        {chat.map((m, i) => (
          <div key={i} className={`message-item ${m.user === username ? 'own' : ''}`}>
            <span className="user-tag">{m.user}</span>
            {m.text}
          </div>
        ))}
      </div>

      <form className="input-area" onSubmit={sendMessage}>
        <input 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;