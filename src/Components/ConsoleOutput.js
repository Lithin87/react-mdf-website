import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import PanelContext from '../Contexts/panel-context';

function ConsoleOutput({eventKey}) {
  const pctx = useContext(PanelContext);
  const message = pctx.output.message || '';
  const messagesEndRef = useRef(null);
  const [formattedMessages, setFormattedMessages] = useState([]);
  const indexCounter = useRef(0);

  useEffect(() => {
    const newMessages = message.split('\n').map((line) => (

      line.trim() !== '' && (
        <React.Fragment key={indexCounter.current++}>
          <span dangerouslySetInnerHTML={{ __html: formatMessage(line) }} />
          <br />
        </React.Fragment>
      )
    ));

    setFormattedMessages(prevMessages => [...prevMessages, ...newMessages]);
  }, [message]);

  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [formattedMessages, eventKey !== '9']);


  const formatMessage = (message) => {
    return message
      .replace(/SourceConnector/g, '<span style="color: blue; font-size: larger; font-size: 1em;">SourceConnector</span>')
      .replace(/DestinationConnector/g, '<span style="color: blue; font-size: larger; font-size: 1em;">DestinationConnector</span>')
      .replace(/Datagen_file_schema/g, '')
      .replace(/HttpSinkConnectorConnector_0/g, '')
      .replace(/Created/g, '<span style="color: green; font-size: larger; font-size: 1em;">Created</span>')
      .replace(/exists/g, '<span style="color: red; font-size: larger; font-size: 1em;">Created</span>')
      .replace(/Deleted/g, '<span style="color: red; font-size: larger; font-size: 1em;">Deleted</span>')
      .replace(/No Connectors present/g, '<span style="color: red; font-size: larger; font-size: 1em;">No Connectors present</span>');
  };

  const divStyle = useMemo(() => {
    return {
      height: eventKey === '9' ? 'auto' : '150px',
      overflowY: 'auto',
    };
  }, [eventKey]);

  
  return (
    <div style={divStyle}>
    {formattedMessages}
    <div  ref={messagesEndRef} />
  </div>
  );
}

export default ConsoleOutput;
