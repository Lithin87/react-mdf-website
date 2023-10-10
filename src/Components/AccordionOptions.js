import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

function FileInputExample({ onFileUpload ,id }) {

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // Get the first selected file
        if (selectedFile) {
          // Read the file content
          const reader = new FileReader();
    
          reader.onload = (e) => {
            const fileContent = e.target.result;
            onFileUpload(fileContent); // Pass the file content to a callback function
          };
    
          reader.readAsText(selectedFile); // You can use other methods like readAsDataURL for images
        }
      };

    return (
      <Form>
        <Form.Group controlId={id} className="mb-3">
          <Form.Label>Choose a File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
      </Form>
    );
  }


function AccordionOptions() {

    const [fileContent, setFileContent] = useState('');

  const handleFileUpload = (content) => {
    setFileContent(content);
  };


  return (
    <Accordion defaultActiveKey={null}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Generate from SCHEMA</Accordion.Header>
        <Accordion.Body>
        <FileInputExample id="as" onFileUpload={handleFileUpload} />
        <div>
        <h2>Uploaded File Content:</h2>
        <pre>{fileContent}</pre>
      </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Generate from JSON</Accordion.Header>
        <Accordion.Body>
         <FileInputExample id="as1" onFileUpload={handleFileUpload} />
         <div>
        <h2>Uploaded File Content:</h2>
        <pre>{fileContent}</pre>
      </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionOptions;