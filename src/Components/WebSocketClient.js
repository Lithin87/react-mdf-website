import React, { useContext, useEffect } from 'react';
import io from 'socket.io-client';
import AppContext from '../Contexts/app-context';


const WebSocketClient = () => {
  const ctx = useContext(AppContext);

  useEffect(() => {
    const socketInstance = io(process.env.REACT_APP_BACKEND_HOST); 

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketInstance.on('Server', (data) => {
      console.log('Received message from server:', data);
      ctx.setAichat(data);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
        console.log('Disconnected from WebSocket server');
      }
    };
  }, []); 

  return (
    <></>
  );
};

export default WebSocketClient;
