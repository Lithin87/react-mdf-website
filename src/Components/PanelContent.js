import { useState, useContext, useEffect  } from 'react';
import AccordionOptions from './AccordionOptions';
import io from 'socket.io-client';
import AppContext from '../Contexts/app-context';

function Panel(props) {
    return (
        
        <div className="panel">
            <div className="panel-header">{props.header}</div>
            <div className="panel-content">{props.children}</div>
        </div>
    );
}


function PanelContent(props) {
    const ctx = useContext(AppContext);

    // const [receivedMessage, setReceivedMessage] = useState('');

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
        <>
            <Panel header="GENERATE DATA">
                <AccordionOptions  eventKey="4" >Generate from JSON</AccordionOptions>
            </Panel>

            <Panel header="DEFINE CONFIG SETTINGS">
            <AccordionOptions  eventKey="3" >Generate from SCHEMA</AccordionOptions>
            <AccordionOptions  eventKey="5" >Generate from Connector Configuration</AccordionOptions>
            </Panel>

            <Panel header="CHAT GPT AUTOMATION">
            <AccordionOptions  eventKey="9">Ask questions from AI</AccordionOptions>
            </Panel>
        </>
    );
}

export default PanelContent;




