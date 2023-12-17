import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketClient = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const socketInstance = io(process.env.REACT_APP_BACKEND_HOST); 
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketInstance.on('Server', (data) => {
      console.log('Received message from server:', data);
      setReceivedMessage(data.message);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        console.log('Disconnected from WebSocket server');
      }
    };
  }, []); 

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.emit('Client', { message }, (r) => setReceivedMessage("Received Message"));
    }
  };

  return (
    <div>
      <h1>WebSocket Client</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send Message</button>
      <p>Received from server: {receivedMessage}</p>
    </div>
  );
};

export default WebSocketClient;
