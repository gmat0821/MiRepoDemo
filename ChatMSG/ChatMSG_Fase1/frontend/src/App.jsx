import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  // Simulamos un nombre de usuario para diferenciar mensajes
  const [username] = useState(`User-${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on('chat_history', (history) => {
      setChat(history);
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('send_message', { user: username, text: message });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>🚀 DevChat - Fase 1</h3>
        <small>Conectado como: {username}</small>
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