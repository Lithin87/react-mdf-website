function ConsoleOutput({ children }) {
  const message = children || '';

  const formatMessage = (message) => {
    
    return message
      .replace(/SourceConnector/g, '<span style="color: blue; font-size: larger;">SourceConnector</span>')
      .replace(/DestinationConnector/g, '<span style="color: blue; font-size: larger;">DestinationConnector</span>')
      .replace(/Created/g, '<span style="color: green; font-size: larger;">Created</span>')
      .replace(/exists/g, '<span style="color: red; font-size: larger;">Created</span>')
      .replace(/Deleted/g, '<span style="color: red; font-size: larger;">Deleted</span>')
      .replace(/No Connectors present/g, '<span style="color: red; font-size: larger;">No Connectors present</span>')
  };

  return (
    <div>
      <pre>
        <span dangerouslySetInnerHTML={{ __html: formatMessage(message) }} />
      </pre>
    </div>
  );
}

export default ConsoleOutput;
